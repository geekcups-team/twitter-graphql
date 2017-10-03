/**
 * @flow
 * @relayHash f5770c7ced6458794fdd3999add4eed6
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type Upvote_UpvoteMutationVariables = {|
  input: {
    id: string;
    clientMutationId?: ?string;
  };
|};
export type Upvote_UpvoteMutationResponse = {|
  +tweetUpvote: ?{|
    +tweet: {|
      +id: string;
      +likeCount: number;
    |};
  |};
|};
*/


/*
mutation Upvote_UpvoteMutation(
  $input: TweetUpvoteInput!
) {
  tweetUpvote(input: $input) {
    tweet {
      id
      likeCount
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "TweetUpvoteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "Upvote_UpvoteMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "TweetUpvoteInput!"
          }
        ],
        "concreteType": "TweetUpvotePayload",
        "name": "tweetUpvote",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Tweet",
            "name": "tweet",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "likeCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "Upvote_UpvoteMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "TweetUpvoteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "Upvote_UpvoteMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "TweetUpvoteInput!"
          }
        ],
        "concreteType": "TweetUpvotePayload",
        "name": "tweetUpvote",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Tweet",
            "name": "tweet",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "likeCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation Upvote_UpvoteMutation(\n  $input: TweetUpvoteInput!\n) {\n  tweetUpvote(input: $input) {\n    tweet {\n      id\n      likeCount\n    }\n  }\n}\n"
};

module.exports = batch;
