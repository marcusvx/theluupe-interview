const { rule, shield } = require('graphql-shield');
const { ironSession } = require('iron-session/express');
const { sessionOptions } = require('../../../shared/lib/auth');

const r = {
  isAnybody: rule({ cache: 'contextual' })(() => true),
  isAuthenticatedUser: rule()(() => {
    const session = ironSession(sessionOptions);
    return Boolean(session && session.user);
  }),
};

const permissions = {
  Query: {
    user: r.isAnybody,
    users: r.isAnybody,
    posts: r.isAnybody,
    post: r.isAnybody,
  },
  Mutation: {
    createUser: r.isAnybody,
    createOnePost: r.isAuthenticatedUser,
  },
  User: r.isAnybody,
  Post: r.isAnybody,
};

const permissionsMiddleware = shield(permissions, {
  fallbackRule: r.isAnybody,
  // graphql-shield catches all resolver errors by default
  // This allows us to get some diagnostic data in all environments
  allowExternalErrors: true,
});

module.exports = {
  permissionsMiddleware,
};
