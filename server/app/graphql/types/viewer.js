const graphql = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../interfaces/node');
const userType = require('./user');
const tweetType = require('./tweet');

const viewerType = new graphql.GraphQLObjectType({
  name: 'Viewer',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    feed: {
      type: new graphql.GraphQLList(tweetType),
      resolve: (root, args, context) => {
        let tweets;
        if (!context.currentUser) {
          tweets = context.db.tweets.data;
        }
        else {
          tweets = context.db.tweets.data.find(t => context.currentUser.follows.include(t.userId));
        }
        return tweets.sort((a, b) => (a < b ? -1 : 1));
      },
    },
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
