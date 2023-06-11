import graphql from "babel-plugin-relay/macro";
import * as React from "react";
import { usePaginationFragment } from "react-relay";
import Comment from "./Comment";
import LoadMoreCommentsButton from "./LoadMoreCommentsButton";
import SmallSpinner from "./SmallSpinner";
import type { StoryCommentsSectionFragment$key } from "./__generated__/StoryCommentsSectionFragment.graphql";

const { useState, useTransition } = React;

export type Props = {
  story: StoryCommentsSectionFragment$key;
};

const StoryCommentsSectionFragment = graphql`
  fragment StoryCommentsSectionFragment on Story
  @refetchable(queryName: "StoryCommentsSectionPaginationQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  ) {
    comments(after: $cursor, first: $count)
      @connection(key: "StoryCommentsSectionFragment_comments") {
      edges {
        node {
          id
          ...CommentFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export default function StoryCommentsSection({ story }: Props) {
  const [isPending, startTransition] = useState(false);
  const { data, loadNext } = usePaginationFragment(
    StoryCommentsSectionFragment,
    story
  );
  const onLoadMore = () => {
    startTransition(true);
    loadNext(3, {
      onComplete: () => startTransition(false),
    });
  };

  return (
    <div>
      {data.comments.edges.map((edge) => (
        <Comment key={edge.node.id} comment={edge.node} />
      ))}
      {data.comments.pageInfo.hasNextPage && (
        <>
          {isPending && <SmallSpinner />}
          <LoadMoreCommentsButton onClick={onLoadMore} disabled={isPending} />
        </>
      )}
    </div>
  );
}
