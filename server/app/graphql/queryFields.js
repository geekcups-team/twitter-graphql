const { nodeField } = require('./interfaces/node');
const viewerType = require('./types/viewer');

module.exports = {
  node: nodeField,
  viewer: {
    type: viewerType,
  },
};
