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

function commonPostInput(t) {
  t.string('title', { nullable: false });
  t.string('content', { nullable: false });
}

const postCreationInput = inputObjectType({
  name: 'PostCreationInput',
  definition(t) {
    commonPostInput(t);
  },
});

const postUpdateInput = inputObjectType({
  name: 'PostUpdateInput',
  definition(t) {
    t.string('id', { nullable: false });
    commonPostInput(t);
  },
});


module.exports = {
  Post,
  postCreationInput,
  postUpdateInput,
};
