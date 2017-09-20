const graphql = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../interfaces/node');

const viewerType = new graphql.GraphQLObjectType({
  name: 'Viewer',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
  }),
});

module.exports = viewerType;
