import React from "react"
import { getSession } from "@auth0/nextjs-auth0"

import withMemberRoleRequired from "utils/withRoleRequired"
import { getMessages } from "utils/chats"
import { MyMessage, OtherMessage, SystemMessage } from "./message"
import ChatHeader from "./header"
import ChatFooter from "./footer"

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
      return <SystemMessage content={message.content} />
    } 
    else if(message.from !== session!.user.sub){
      return <OtherMessage content={message.content} date={'10:23'} name={message.from}/>
    }
    else {
      return <MyMessage content={message.content} date={'10:23'}/>
    }
  });

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='w-full h-full flex flex-col items-center'>
        <ChatHeader />
        <div className="w-full h-fit flex flex-col p-2 max-w-[1000px]"> 
          {items}
        </div>
      </div>
      <ChatFooter />
    </div>
  )
}
export default withMemberRoleRequired(Page);
