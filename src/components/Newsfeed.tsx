import Story from "./Story";

import graphql from "babel-plugin-relay/macro";
import {
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import { NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import SmallSpinner from "./SmallSpinner";
import { useState } from "react";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedContentsFragment
  }
`;

const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Query
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  )
  @refetchable(queryName: "NewsfeedContentsRefetchQuery") {
    viewer {
      newsfeedStories(after: $cursor, first: $count)
        @connection(key: "NewsfeedContentsFragment_newsfeedStories") {
        edges {
          node {
            id
            ...StoryFragment
          }
        }
      }
    }
  }
`;

export default function Newsfeed() {
  const [isPending, startTransition] = useState(false);
  const queryData = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    NewsfeedContentsFragment,
    queryData as NewsfeedContentsFragment$key
  );
  const storyEdges = data.viewer.newsfeedStories.edges;

  function onEndReached() {
    startTransition(true);
    loadNext(3, {
      onComplete: () => startTransition(false),
    });
  }

  return (
    <div className="newsfeed">
      {storyEdges.map((storyEdge) => (
        <Story key={storyEdge.node.id} story={storyEdge.node} />
      ))}
      {isPending && <SmallSpinner />}
      <InfiniteScrollTrigger
        onEndReached={onEndReached}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </div>
  );
}
