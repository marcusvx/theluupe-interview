const { rule, shield } = require('graphql-shield');

const r = {
  isAnybody: rule({ cache: 'contextual' })(() => true),
};

const permissions = {
  Query: {
    user: r.isAnybody,
    users: r.isAnybody,
    posts: r.isAnybody,
    post: r.isAnybody,
  },
  Mutation: {
    createOneUser: r.isAnybody,
    createOnePost: r.isAnybody,
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
