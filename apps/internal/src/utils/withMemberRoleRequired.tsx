import React from "react";
import { getSession } from "@auth0/nextjs-auth0"

import { getUserRoles } from "./auth0Api"
import handleUnauthorized from "./handleUnauthorized";
import { redirect } from "next/navigation";

type IPageProps = {
  params: {
    slug: string
  },
  searchParams: {
    [key: string]: string
  }
}
type IReturnType = (props: IPageProps) => Promise<JSX.Element>;

export default function(Page: React.ComponentType<IPageProps>): IReturnType{

  return async (props: IPageProps) => {
    
    const session = await getSession();
    if(!session) 
      redirect("/api/auth/login?returnTo=/home");

    const roles = await getUserRoles(session.user.sub);

    for(const role of roles) {
      if(role.name === "Member")
        return <Page {...props}/> 
    }
    
    handleUnauthorized();
  };
}
