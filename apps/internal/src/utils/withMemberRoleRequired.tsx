import React from "react";
import { WithPageAuthRequiredAppRouterOptions, getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation";

import { getUserRoles } from "./auth0Api"
import handleUnauthorized from "./handleUnauthorized";

type IPageProps = {
  params: {
    slug: string
  },
  searchParams: {
    [key: string]: string
  }
}
type IReturnType = (props: IPageProps) => Promise<JSX.Element>;

export default function(Page: React.ComponentType<IPageProps>, opts: WithPageAuthRequiredAppRouterOptions): IReturnType{

  return async (props: IPageProps) => {
    
    const session = await getSession();
    if(!session) 
      redirect(`/api/auth/login?returnTo=${opts.returnTo}`);

    const roles = await getUserRoles(session.user.sub);

    for(const role of roles) {
      if(role.name === "Member")
        return <Page {...props}/> 
    }
    
    handleUnauthorized();
  };
}
