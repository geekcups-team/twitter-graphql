const graphql = require('graphql');

const tweetType = require('../../types/tweet');

const name = 'TweetCreate';

const mutateAndGetPayload = ({ text }, context) => {
  if (!context.currentUser) throw new Error('Missing authentication');

  const tweet = {
    id: `${context.currentUser.id}_${new Date().valueOf()}`,
    text,
    likeCount: 0,
    createdAt: new Date(),
    userId: context.currentUser.id,
  };

  context.db.tweets.data.push(tweet);

  return {
    tweet,
  };
};

const inputFields = {
  text: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
  },
};

const outputFields = {
  tweet: {
    type: new graphql.GraphQLNonNull(tweetType),
  },
};

module.exports = {
  inputFields,
  outputFields,
  mutateAndGetPayload,
  name,
};
