/**
 * @generated SignedSource<<c4b1353d7de74292635d6ccf701611e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoryFragment$data = {
  readonly createdAt: string;
  readonly poster: {
    readonly " $fragmentSpreads": FragmentRefs<"PosterBylineFragment">;
  };
  readonly summary: string | null;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ImageFragment">;
  } | null;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"StoryCommentsSectionFragment">;
  readonly " $fragmentType": "StoryFragment";
};
export type StoryFragment$key = {
  readonly " $data"?: StoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoryFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StoryCommentsSectionFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "poster",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PosterBylineFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": [
            {
              "kind": "Literal",
              "name": "width",
              "value": 400
            }
          ],
          "kind": "FragmentSpread",
          "name": "ImageFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Story",
  "abstractKey": null
};

(node as any).hash = "7700df8ecef9f35274d94aff19a05033";

export default node;
