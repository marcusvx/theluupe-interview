const { inputObjectType, objectType, extendInputType } = require('nexus');
const { fullName, totalPosts } = require('./resolvers');

const User = objectType({
  name: 'User',
  definition: t => {
    t.model.id();
    t.model.email();
    t.model.firstName();
    t.model.lastName();
    t.int('totalPosts', { resolve: totalPosts });
    t.string('fullName', { resolve: fullName });
  },
});

function commonUserInput(t) {
  t.string('firstName', { nullable: false });
  t.string('lastName', { nullable: false });
}

const userEditInput = inputObjectType({
  name: 'UserEditInput',
  definition: t => {
    t.string('id', { nullable: false });
    commonUserInput(t);
  },
});

const signupInput = inputObjectType({
  name: 'SignupInput',
  definition: t => {
    commonUserInput(t);
    t.string('email', { nullable: false });
    t.string('password', { nullable: false });
  },
});

module.exports = {
  User,
  signupInput,
  userEditInput,
};
