const { mutationWithClientMutationId } = require('graphql-relay');
const loginMutation = require('./mutations/authentication/login');

const tweetUpvoteMutation = require('./mutations/tweets/upvote');
const tweetDownvoteMutation = require('./mutations/tweets/downvote');
const tweetCreateMutation = require('./mutations/tweets/create');

module.exports = {
  login: mutationWithClientMutationId(loginMutation),

  tweetUpvote: mutationWithClientMutationId(tweetUpvoteMutation),
  tweetDownvote: mutationWithClientMutationId(tweetDownvoteMutation),
  tweetCreate: mutationWithClientMutationId(tweetCreateMutation),
};
