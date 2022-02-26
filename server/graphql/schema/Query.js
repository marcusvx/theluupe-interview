const { queryType } = require('nexus');

const Query = queryType({
  definition(t) {
    t.crud.post({ filtering: true });
    t.crud.posts({ ordering: true, filtering: true });

    t.list.field('users', {
      type: 'User',
      args: {},
      resolve: async (_root, _args, ctx) => {
        return await ctx.prisma.user.findMany({
          include: {
            _count: {
              select: { posts: true },
            },
          },
        });
      },
    });
  },
});

module.exports = {
  Query,
};
