import graphql from "babel-plugin-relay/macro";
import * as React from "react";
import { useFragment } from "react-relay";
import Card from "./Card";
import Heading from "./Heading";
import Image from "./Image";
import PosterByline from "./PosterByline";
import StoryCommentsSection from "./StoryCommentsSection";
import StorySummary from "./StorySummary";
import Timestamp from "./Timestamp";
import { StoryFragment$key } from "./__generated__/StoryFragment.graphql";
import StoryLikeButton from "./StoryLikeButton";

type Props = {
  story: StoryFragment$key;
};

const StoryFragment = graphql`
  fragment StoryFragment on Story {
    ...StoryCommentsSectionFragment
    title
    summary
    createdAt
    poster {
      ...PosterBylineFragment
    }
    thumbnail {
      ...ImageFragment @arguments(width: 400)
    }
    ...StoryLikeButtonFragment
  }
`;

export default function Story({ story }: Props): React.ReactElement {
  const data = useFragment(StoryFragment, story);

  return (
    <Card>
      <PosterByline poster={data.poster} />
      <Heading>{data.title}</Heading>
      <Timestamp time={data.createdAt} />
      <Image image={data.thumbnail} width={400} height={400} />
      <StorySummary summary={data.summary} />
      <StoryLikeButton story={data} />
      <StoryCommentsSection story={data} />
    </Card>
  );
}
