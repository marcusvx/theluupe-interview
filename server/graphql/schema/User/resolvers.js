const { hash } = require('bcrypt');

function fullName(parent) {
  const { firstName, lastName } = parent;
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  return null;
}

function totalPosts(parent) {
  const { _count } = parent;
  return _count ? _count.posts : 0;
}

async function signup(_, { signupInput: { firstName, lastName, email, password } }, ctx) {
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
}

async function editUser(_, { userEditInput: { id, firstName, lastName } }, ctx) {
  try {
    const user = await ctx.prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
      },
    });

    ctx.request.session.user = user;
    await ctx.request.session.save();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  fullName,
  totalPosts,
  signup,
  editUser,
};
