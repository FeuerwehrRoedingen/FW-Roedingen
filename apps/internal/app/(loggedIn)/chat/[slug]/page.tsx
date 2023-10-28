import React from "react"
import { getSession } from "@auth0/nextjs-auth0"

import withMemberRoleRequired from "utils/withMemberRoleRequired"
import { getMessages } from "utils/chats"
import ChatHeader from "./header"

type IProps = {
  params: {
    slug: string
  }
}

async function Page(props: IProps){
  
  const messages = await getMessages(props.params.slug);
  const session = await getSession();

  const items = messages.map(message => {

    if(message.from === "system"){
      return (
        <div>
          
        </div>
      )
    } else if(message.from === session!.user.sub){
      return (
        <div>
          <p>{message.content}</p>
        </div>
      )
    }
    else {
      return (
        <div>

        </div>
      )
    }
  });

  return (
    <div>
      <ChatHeader />
      <div className="w-full h-full flex flex-col p-2"> 
        {items}
      </div>
    </div>
  )
}
export default withMemberRoleRequired(Page);
