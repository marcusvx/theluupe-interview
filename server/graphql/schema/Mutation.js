const { arg, mutationType } = require('nexus');
const { hash } = require('bcrypt');

const Mutation = mutationType({
  definition(t) {
    t.crud.createOnePost();

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
  },
});

module.exports = {
  Mutation,
};
