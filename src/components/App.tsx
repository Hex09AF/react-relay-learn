import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Newsfeed from "./Newsfeed";

export default function App(): React.ReactElement {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="app">
        <Newsfeed />
      </div>
    </Suspense>
  );
}
