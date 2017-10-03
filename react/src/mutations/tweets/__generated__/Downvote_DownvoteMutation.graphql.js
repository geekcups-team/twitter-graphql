/**
 * @flow
 * @relayHash 571d54660db30bdf882c873fdac3c153
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type Downvote_DownvoteMutationVariables = {|
  input: {
    id: string;
    clientMutationId?: ?string;
  };
|};
export type Downvote_DownvoteMutationResponse = {|
  +tweetDownvote: ?{|
    +likeCount: number;
  |};
|};
*/


/*
mutation Downvote_DownvoteMutation(
  $input: TweetDownvoteInput!
) {
  tweetDownvote(input: $input) {
    likeCount
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "TweetDownvoteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "Downvote_DownvoteMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "TweetDownvoteInput!"
          }
        ],
        "concreteType": "TweetDownvotePayload",
        "name": "tweetDownvote",
        "plural": false,
        "selections": [
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
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "Downvote_DownvoteMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "TweetDownvoteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "Downvote_DownvoteMutation",
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
            "type": "TweetDownvoteInput!"
          }
        ],
        "concreteType": "TweetDownvotePayload",
        "name": "tweetDownvote",
        "plural": false,
        "selections": [
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
    ]
  },
  "text": "mutation Downvote_DownvoteMutation(\n  $input: TweetDownvoteInput!\n) {\n  tweetDownvote(input: $input) {\n    likeCount\n  }\n}\n"
};

module.exports = batch;
