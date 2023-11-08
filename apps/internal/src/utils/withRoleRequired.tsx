import React from "react";
import { WithPageAuthRequiredAppRouterOptions, getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation";

import handleUnauthorized from "./handleUnauthorized";
import { fetchApi } from "./api";
import handleError from "./handleError";

type IRole = {
  id: string,
  name: string,
  description: string
}

type IPageProps = {
  params: {
    slug: string
  },
  searchParams: {
    [key: string]: string
  }
}
type IReturnType = (props: IPageProps) => Promise<JSX.Element>;

function withRoleRequired(requiredRole: string, Page: React.FunctionComponent<IPageProps>, opts: WithPageAuthRequiredAppRouterOptions): IReturnType {
  return async (props: IPageProps) => {
    
    const session = await getSession();
    if(!session) 
      redirect(`/api/auth/login?returnTo=${opts.returnTo}`);

    const res = await fetchApi(`/user/${session.user.sub}/roles`)

    if(res.status === 401)
      handleUnauthorized(session);

    if(res.status !== 200)
      handleError({
        message: res.statusText,
        name: res.status.toString()
      })
    
    const roles: IRole[] = await res.json();

    for(const role of roles) {
      if(role.name === requiredRole)
        return <Page {...props}/> 
    }
    
    handleUnauthorized(session);
  };
}

export function withMemberRoleRequired(Page: React.FunctionComponent<IPageProps>, opts: WithPageAuthRequiredAppRouterOptions): IReturnType{
  return withRoleRequired("Member", Page, opts);
}

export function withAdminRoleRequired(Page: React.FunctionComponent<IPageProps>, opts: WithPageAuthRequiredAppRouterOptions): IReturnType{
  return withRoleRequired("Admin", Page, opts);
}