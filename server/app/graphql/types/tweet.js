const graphql = require('graphql');

const tweetType = new graphql.GraphQLObjectType({
  name: 'Tweet',
  fields: () => ({
    text: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    likeCount: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
    },
    user: {
      type: new graphql.GraphQLNonNull(require('./user')), // eslint-disable-line global-require
      resolve: (root, args, context) => context.db.users.data.find(u => u.id === root.userId),
    },
  }),
});

module.exports = tweetType;
