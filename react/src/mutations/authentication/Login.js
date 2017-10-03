import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation Login_LoginMutation($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

let clientMutationId = 0;
const createNextClientMutationId = () => {
  clientMutationId += 1;
  return `login${clientMutationId}`;
};

const commit = (environment, input) => (
  new Promise((fullfill, reject) => {
    const variables = {
      input: {
        ...input,
        clientMutationId: createNextClientMutationId(),
      },
    };

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (data, error) => {
        if (error) {
          reject(error);
        }
        else {
          fullfill(data);
        }
      },
      onError: err => reject(err),
    });
  })
);

export default { commit };
