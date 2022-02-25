const { inputObjectType } = require('nexus');

const objectDeleteInput = inputObjectType({
  name: 'ObjectDeleteInput',
  definition(t) {
    t.string('id', { nullable: false });
  },
});

module.exports = {
  objectDeleteInput,
};
