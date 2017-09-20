const { nodeField } = require('./interfaces/node');
const viewerType = require('./types/viewer');

module.exports = {
  node: nodeField,
  viewer: {
    type: viewerType,
    resolve: (root, args, context) => {
      if (!context.currentUser) {
        return {
          id: 'anonymous',
        };
      }
      return context.currentUser;
    },
  },
};
