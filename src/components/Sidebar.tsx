import * as React from "react";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import ContactsList from "./ContactsList";
import LoadingSpinner from "./LoadingSpinner";
import ViewerProfile from "./ViewerProfile";
import type { SidebarQuery as SidebarQueryType } from "./__generated__/SidebarQuery.graphql";

const SidebarQuery = graphql`
  query SidebarQuery {
    viewer {
      ...ViewerProfileFragment
      ...ContactsListFragment
    }
  }
`;

export default function Sidebar() {
  return (
    <div className="sidebar">
      <React.Suspense fallback={<LoadingSpinner />}>
        <SidebarContents />
      </React.Suspense>
    </div>
  );
}

function SidebarContents() {
  const data = useLazyLoadQuery<SidebarQueryType>(SidebarQuery, {});
  return (
    <>
      <ViewerProfile viewer={data.viewer} />
      <ContactsList viewer={data.viewer} />
    </>
  );
}
