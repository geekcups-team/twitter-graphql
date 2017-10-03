const graphql = require('graphql');
const { globalIdField, fromGlobalId } = require('graphql-relay');

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
          tweets = context.db.tweets.data
            .filter(t => context.currentUser.follows.includes(t.userId));
        }
        return tweets.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      },
    },
    user: {
      type: new graphql.GraphQLNonNull(userType),
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID),
        },
      },
      resolve: (root, args, context) => {
        const { id } = fromGlobalId(args.id);
        return context.db.users.data.find(u => u.id === id);
      },
    },
    suggestedUsers: {
      type: new graphql.GraphQLList(userType),
      resolve: (root, args, context) => {
        let users;
        if (!context.currentUser) {
          users = context.db.users.data;
        }
        else {
          users = context.db.users.data
            .filter(u => (context.currentUser.id !== u.id &&
              !context.currentUser.follows.includes(u.id)));
        }
        return users;
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
