const { fullName } = require('../User/resolvers');

async function createPost(_, { postCreationInput: { content, title } }, ctx) {
  try {
    const { user } = ctx.request.session;
    const postCreated = await ctx.prisma.post.create({
      data: {
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          connect: {
            id: user.id,
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
      author: fullName(postCreated.author),
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function editPost(_, { postUpdateInput: { id, content, title } }, ctx) {
  try {
    const postCreated = await ctx.prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
      include: { author: true },
    });

    return {
      id: postCreated.id,
      title: postCreated.title,
      content: postCreated.content,
      createdAt: postCreated.createdAt,
      author: fullName(postCreated.author),
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deletePost(_, { id }, ctx) {
  try {
    await ctx.prisma.post.delete({
      where: {
        id,
      },
    });

    return { id };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createPost, editPost, deletePost };
