const graphql = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../interfaces/node');

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      resolve: (root, args, context) => {
        let { profile } = root;
        if (!profile) {
          profile = context.db.profiles.data.find(p => p.userId === root.id);
        }
        return profile.name;
      },
    },
    bio: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      resolve: (root, args, context) => {
        let { profile } = root;
        if (!profile) {
          profile = context.db.profiles.data.find(p => p.userId === root.id);
        }
        return profile.bio;
      },
    },
    avatarUrl: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      resolve: (root, args, context) => `${context.baseUrl}/assets/avatars/${root.username}.jpg`,
    },
    coverUrl: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      resolve: (root, args, context) => `${context.baseUrl}/assets/covers/${root.username}.jpg`,
    },
    tweets: {
      type: new graphql.GraphQLList(require('./tweet')), // eslint-disable-line global-require
      resolve: (root, args, context) => context.db.tweets.data
        .filter(t => t.userId === root.id)
        .sort((a, b) => (a < b ? -1 : 1)),
    },
    follows: {
      type: new graphql.GraphQLList(require('./user')), // eslint-disable-line global-require
      resolve: (root, args, context) => context.db.users.data
        .filter(u => root.follows.includes(u.id)),
    },
  }),
});

module.exports = userType;
