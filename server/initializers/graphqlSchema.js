const graphql = require('graphql');
const queryFields = require('../app/graphql/queryFields');
const mutationFields = require('../app/graphql/mutationFields');

async function init() {
  const rootSchema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
      name: 'Root',
      fields: queryFields,
    }),
    mutation: new graphql.GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields,
    }),
  });

  return rootSchema;
}

module.exports = init();
