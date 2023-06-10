import Story from "./Story";

import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStory {
      ...StoryFragment
    }
  }
`;

export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});
  const story = data.topStory;

  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
