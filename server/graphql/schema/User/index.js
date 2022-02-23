const { inputObjectType, objectType } = require('nexus');
const { fullName } = require('./resolvers');

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.firstName();
    t.model.lastName();
    t.string('fullName', { resolve: fullName });
  },
});

const signupInput = inputObjectType({
  name: 'SignupInput',
  definition(t) {
    t.string('firstName', { nullable: false });
    t.string('lastName', { nullable: false });
    t.string('email', { nullable: false });
    t.string('password', { nullable: false });
  },
});

module.exports = {
  User,
  signupInput,
};
