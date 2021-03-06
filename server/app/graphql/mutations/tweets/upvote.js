const graphql = require('graphql');
const { fromGlobalId } = require('graphql-relay');
const tweetType = require('../../types/tweet');

const name = 'TweetUpvote';

const wait = () => (
  new Promise(resolve => setTimeout(() => resolve(), 3000))
);

const mutateAndGetPayload = async ({ id: globalId }, context) => {
  if (!context.currentUser) throw new Error('Missing authentication');

  const { id } = fromGlobalId(globalId);
  const tweet = context.db.tweets.data.find(t => t.id === id);

  if (!tweet) throw new Error('Tweet not found', globalId);

  await wait();
  tweet.likeCount += 1;
  return {
    tweet,
  };
};

const inputFields = {
  id: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLID),
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
