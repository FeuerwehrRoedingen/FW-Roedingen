import { Avatar } from "@nextui-org/react"
import type { IChat } from "utils/chats"

import { getChatPreview } from "utils/chats";

type IProps = {
  chatId: string
}

export default async function Chat(props: IProps){

  const preview = await getChatPreview(props.chatId);

  return (
    <div className="w-full h-20 flex flex-row">
      <div className="w-[15%] h-full flex items-center justify-center">
        <Avatar size='lg'/>
      </div>
      <div className="w-[85%] h-full">
        <div className="w-full h-1/2 flex flex-row justify-between items-center">
          <h1>
            {preview.name}
          </h1>
          <p>
            {preview.lastMessage}
          </p>
        </div>
        <div className="w-full h-1/2 flex flex-row justify-between items-center">
          <p>
            {formatDate(preview.lastMessageAt)}
          </p>
        </div>
      </div>
    </div>
  )
}

const today = new Date();
const todayDate = today.getDate();

function formatDate(date: Date){

  const _date = date.getDate();

  if(_date === todayDate){
    return date.toLocaleTimeString();
  }
  else if(_date === todayDate - 1){
    return "Gestern";
  }
  else if()
}