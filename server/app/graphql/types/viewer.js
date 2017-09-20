const graphql = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../interfaces/node');
const userType = require('./user');

const viewerType = new graphql.GraphQLObjectType({
  name: 'Viewer',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    me: {
      type: userType,
      resolve: (root, args, context) => {
        if (!context.currentUser) {
          return null;
        }
        return context.currentUser;
      },
    },
  }),
});

module.exports = viewerType;
