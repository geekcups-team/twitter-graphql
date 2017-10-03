/**
 * @flow
 * @relayHash 6b878a79ce31d7cfc49749a2da76d1d1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type Create_CreateMutationVariables = {|
  input: {
    text: string;
    clientMutationId?: ?string;
  };
|};
export type Create_CreateMutationResponse = {|
  +tweetCreate: ?{|
    +tweet: {|
      +id: string;
    |};
  |};
|};
*/


/*
mutation Create_CreateMutation(
  $input: TweetCreateInput!
) {
  tweetCreate(input: $input) {
    tweet {
      id
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
        "type": "TweetCreateInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "Create_CreateMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "TweetCreateInput!"
          }
        ],
        "concreteType": "TweetCreatePayload",
        "name": "tweetCreate",
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
  "name": "Create_CreateMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "TweetCreateInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "Create_CreateMutation",
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
            "type": "TweetCreateInput!"
          }
        ],
        "concreteType": "TweetCreatePayload",
        "name": "tweetCreate",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation Create_CreateMutation(\n  $input: TweetCreateInput!\n) {\n  tweetCreate(input: $input) {\n    tweet {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
