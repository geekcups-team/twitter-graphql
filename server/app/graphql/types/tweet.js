const graphql = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../interfaces/node');

const tweetType = new graphql.GraphQLObjectType({
  name: 'Tweet',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    text: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    likeCount: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
    },
    createdAt: {
      type: new graphql.GraphQLNonNull(GraphQLDateTime),
    },
    user: {
      type: new graphql.GraphQLNonNull(require('./user')), // eslint-disable-line global-require
      resolve: (root, args, context) => context.db.users.data.find(u => u.id === root.userId),
    },
  }),
});

module.exports = tweetType;
