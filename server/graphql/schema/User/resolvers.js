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

module.exports = {
  fullName,
  totalPosts,
};
