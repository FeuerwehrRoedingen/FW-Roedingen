import React from "react";
import { getSession } from "@auth0/nextjs-auth0"

import { getUserRoles } from "./auth0Api"
import handleUnauthorized from "./handleUnauthorized";

type IReturnType = () => Promise<JSX.Element>;

export default function(Page: React.ComponentType): IReturnType{

  return async () => {
    
    const session = await getSession();
    if(!session) 
      handleUnauthorized();

    const roles = await getUserRoles(session.user.sub);

    for(const role of roles) {
      if(role.name === "Member")
        return <Page /> 
    }
    
    handleUnauthorized();
  };
}
