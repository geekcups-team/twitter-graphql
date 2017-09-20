const { mutationWithClientMutationId } = require('graphql-relay');
const loginMutation = require('./mutations/authentication/login');

const tweetUpvoteMutation = require('./mutations/tweets/upvote');
const tweetCreateMutation = require('./mutations/tweets/create');

module.exports = {
  login: mutationWithClientMutationId(loginMutation),

  tweetUpvote: mutationWithClientMutationId(tweetUpvoteMutation),
  tweetCreate: mutationWithClientMutationId(tweetCreateMutation),
};
