import React from "react";

import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import { LoadingIcon } from "./loadingIcon";

type UserProps = {
  user: UserProfile;
}

export const securedPage = <P extends {}>(page: React.ComponentType<P & UserProps>, path?: string) => withPageAuthRequired(page, {
  onError: (error) => <div>{error.message}</div>,
  onRedirecting: () => <LoadingIcon fullscreen/>,
  returnTo: path
});
