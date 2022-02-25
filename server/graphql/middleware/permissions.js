const { rule, shield } = require('graphql-shield');

const r = {
  isAnybody: rule({ cache: 'contextual' })(() => true),
  isAuthenticatedUser: rule()((parent, args, ctx) => {
    const { session } = ctx.request;
    return Boolean(session && session.user);
  }),
};

const permissions = {
  Query: {
    user: r.isAnybody,
    users: r.isAuthenticatedUser,
    posts: r.isAnybody,
    post: r.isAnybody,
  },
  Mutation: {
    createUser: r.isAnybody,
    createPost: r.isAuthenticatedUser,
    editUser: r.isAuthenticatedUser,
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
