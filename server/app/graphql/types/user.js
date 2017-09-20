const graphql = require('graphql');

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
  }),
});

module.exports = userType;
