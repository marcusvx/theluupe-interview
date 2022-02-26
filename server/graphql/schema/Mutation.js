const { arg, mutationType } = require('nexus');
const { signup, editUser } = require('./User/resolvers');
const { createPost, editPost, deletePost } = require('./Post/resolvers');

const Mutation = mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      nullable: false,
      args: {
        signupInput: arg({ type: 'SignupInput', required: true }),
      },
      resolve: signup,
    });

    t.field('createPost', {
      type: 'Post',
      nulllable: false,
      args: {
        postCreationInput: arg({ type: 'PostCreationInput', required: true }),
      },
      resolve: createPost,
    });

    t.field('editPost', {
      type: 'Post',
      nulllable: false,
      args: {
        postUpdateInput: arg({ type: 'PostUpdateInput', required: true }),
      },
      resolve: editPost,
    });

    t.field('editUser', {
      type: 'User',
      nullable: false,
      args: {
        userEditInput: arg({ type: 'UserEditInput', required: true }),
      },
      resolve: editUser,
    });

    t.field('deletePost', {
      type: 'Post',
      nullable: false,
      args: {
        id: arg({ type: 'String', required: true }),
      },
      resolve: deletePost,
    });
  },
});

module.exports = {
  Mutation,
};
