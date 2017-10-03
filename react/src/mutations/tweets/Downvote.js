import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation Downvote_DownvoteMutation($input: TweetDownvoteInput!) {
    tweetDownvote(input: $input) {
      likeCount
    }
  }
`;

let clientMutationId = 0;
const createNextClientMutationId = () => {
  clientMutationId += 1;
  return `tweetDownvote${clientMutationId}`;
};

const commit = (environment, input) => {
  const variables = {
    input: {
      id: input.id,
      clientMutationId: createNextClientMutationId(),
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    optimisticUpdater: (store) => {
      const tweet = store.get(input.id);
      tweet.setValue(tweet.getValue('likeCount') - 1, 'likeCount');
    },
    updater: (store, data) => {
      const tweet = store.get(input.id);
      tweet.setValue(data.tweetDownvote.likeCount, 'likeCount');
    },
  });
};

export default { commit };
