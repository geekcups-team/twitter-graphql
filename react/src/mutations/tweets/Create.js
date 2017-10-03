import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation Create_CreateMutation($input: TweetCreateInput!) {
    tweetCreate(input: $input) {
      tweet {
        id
      }
    }
  }
`;

let clientMutationId = 0;
const createNextClientMutationId = () => {
  clientMutationId += 1;
  return `tweetCreate${clientMutationId}`;
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
