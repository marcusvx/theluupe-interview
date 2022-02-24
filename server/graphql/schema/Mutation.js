const { arg, mutationType } = require('nexus');
const { hash } = require('bcrypt');
const { fullName } = require('./User/resolvers');

const Mutation = mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      nullable: false,
      args: {
        signupInput: arg({ type: 'SignupInput', required: true }),
      },
      resolve: async (_, { signupInput: { firstName, lastName, email, password } }, ctx) => {
        try {
          const user = await ctx.prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (user) {
            throw new Error('Email is already associated with another user');
          }

          const hashedPassword = await hash(password, 10);
          return await ctx.prisma.user.create({
            data: {
              firstName,
              lastName,
              password: hashedPassword,
              email,
            },
          });
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });

    t.field('createPost', {
      type: 'Post',
      nulllable: false,
      args: {
        postCreationInput: arg({ type: 'PostCreationInput', required: true }),
      },
      resolve: async (_, { postCreationInput: { content, title } }, ctx) => {
        try {
          const { user } = ctx.request.session;
          if (!user) {
            throw new Error('User not authenticated');
          }

          const postCreated = await ctx.prisma.post.create({
            data: {
              title,
              content,
              createdAt: new Date(),
              updatedAt: new Date(),
              author: {
                connect: {
                  email: user.email,
                },
              },
            },
            include: {
              author: true,
            },
          });

          return {
            id: postCreated.id,
            title: postCreated.title,
            content: postCreated.content,
            createdAt: postCreated.createdAt,
            author: fullName(user),
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});

module.exports = {
  Mutation,
};
