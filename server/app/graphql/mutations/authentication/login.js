const graphql = require('graphql');

const name = 'Login';

const mutateAndGetPayload = ({ username, password }, context) => {
  const user = context.db.users.find(u => u.username === username && u.password === password);

  if (!user) throw new Error('Invalid credentials');

  return {
    token: user.token,
  };
};

const inputFields = {
  username: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
  },
  password: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
  },
};

const outputFields = {
  token: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
  },
};

module.exports = {
  inputFields,
  outputFields,
  mutateAndGetPayload,
  name,
};
