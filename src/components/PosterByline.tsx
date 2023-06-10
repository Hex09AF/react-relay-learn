import * as React from "react";
import graphql from "babel-plugin-relay/macro";
import Image from "./Image";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import { useFragment } from "react-relay";

export type Props = {
  poster: PosterBylineFragment$key;
};

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`;

export default function PosterByline({
  poster,
}: Props): React.ReactElement | null {
  const data = useFragment(PosterBylineFragment, poster);

  return (
    <div className="byline">
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
    </div>
  );
}
