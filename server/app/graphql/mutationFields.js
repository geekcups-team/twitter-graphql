const { mutationWithClientMutationId } = require('graphql-relay');
const loginMutation = require('./mutations/authentication/login');

module.exports = {
  login: mutationWithClientMutationId(loginMutation),
};
