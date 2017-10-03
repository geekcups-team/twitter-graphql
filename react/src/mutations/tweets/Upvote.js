import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation Upvote_UpvoteMutation($input: TweetUpvoteInput!) {
    tweetUpvote(input: $input) {
      tweet {
        id
        likeCount
      }
    }
  }
`;

let clientMutationId = 0;
const createNextClientMutationId = () => {
  clientMutationId += 1;
  return `tweetUpvote${clientMutationId}`;
};

const commit = (environment, tweet) => {
  const variables = {
    input: {
      id: tweet.id,
      clientMutationId: createNextClientMutationId(),
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    optimisticResponse: {
      tweetUpvote: {
        tweet: {
          id: tweet.id,
          likeCount: tweet.likeCount + 1,
        },
      },
    },
  });
};

export default { commit };
