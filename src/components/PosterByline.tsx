import graphql from "babel-plugin-relay/macro";
import * as React from "react";
import { useFragment } from "react-relay";
import Hovercard from "./Hovercard";
import Image from "./Image";
import PosterDetailsHovercardContents from "./PosterDetailsHovercardContents";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
const { useRef } = React;

export type Props = {
  poster: PosterBylineFragment$key;
};

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
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
  const hoverRef = useRef(null);

  return (
    <div ref={hoverRef} className="byline">
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
      <Hovercard targetRef={hoverRef}>
        <PosterDetailsHovercardContents posterID={data.id} />
      </Hovercard>
    </div>
  );
}
