const { rule, shield } = require('graphql-shield');

const r = {
  isAnybody: rule({ cache: 'contextual' })(() => true),
  isAuthenticatedUser: rule()((parent, args, ctx) => {
    const { session } = ctx.request;
    return Boolean(session && session.user);
  }),
  canEditUser: rule()((_, { userEditInput: { id } }, ctx) => isSameUser(id, ctx)),
  canEditPost: rule()(async (_, { postUpdateInput: { id } }, ctx) => await isSamePostUser(id, ctx)),
  canDeletePost: rule()(async (_, { id }, ctx) => await isSamePostUser(id, ctx)),
};

async function isSamePostUser(postId, ctx) {
  const post = await ctx.prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
    },
  });

  return isSameUser(post.author.id, ctx);
}

function isSameUser(userId, ctx) {
  const { session } = ctx.request;
  const sessionUser = session.user;

  return Boolean(sessionUser && userId === sessionUser.id);
}

const permissions = {
  Query: {
    users: r.isAuthenticatedUser,
    posts: r.isAnybody,
    post: r.isAnybody,
  },
  Mutation: {
    createUser: r.isAnybody,
    createPost: r.isAuthenticatedUser,
    editUser: r.canEditUser,
    editPost: r.canEditPost,
    deletePost: r.canDeletePost,
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
