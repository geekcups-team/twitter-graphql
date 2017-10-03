const graphql = require('graphql');
const { fromGlobalId } = require('graphql-relay');

const name = 'TweetDownvote';

const wait = () => (
  new Promise(resolve => setTimeout(() => resolve(), 3000))
);

const mutateAndGetPayload = async ({ id: globalId }, context) => {
  if (!context.currentUser) throw new Error('Missing authentication');

  const { id } = fromGlobalId(globalId);
  const tweet = context.db.tweets.data.find(t => t.id === id);

  if (!tweet) throw new Error('Tweet not found', globalId);

  await wait();
  tweet.likeCount -= tweet.likeCount === 0 ? 0 : 1;
  return {
    likeCount: tweet.likeCount,
  };
};

const inputFields = {
  id: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLID),
  },
};

const outputFields = {
  likeCount: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
  },
};

module.exports = {
  inputFields,
  outputFields,
  mutateAndGetPayload,
  name,
};
