import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Newsfeed from "./Newsfeed";
import Sidebar from "./Sidebar";

export default function App(): React.ReactElement {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="app">
        <Newsfeed />
        <Sidebar />
      </div>
    </Suspense>
  );
}
