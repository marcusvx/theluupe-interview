const { inputObjectType, objectType } = require('nexus');

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.content();
    t.model.author();
  },
});

const postCreationInput = inputObjectType({
  name: 'PostCreationInput',
  definition(t) {
    t.string('title', { nullable: false });
    t.string('content', { nullable: false });
  },
});

module.exports = {
  Post,
  postCreationInput,
};
