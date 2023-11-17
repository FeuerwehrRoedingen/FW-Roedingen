import { Avatar } from "@nextui-org/react"

import { getChatPreview } from "utils/data/chats";

type IProps = {
  chatId: string;
  active?: boolean;
  onClick: (id: string) => void;
}

export default async function Chat(props: IProps){

  const preview = await getChatPreview(props.chatId);

  if(!preview)
    return null;

  const backgroundColor = props.active ? "bg-gray-900 hover:bg-gray-800": "bg-gray-950 hover:bg-gray-900";

  return (
    <div className={`w-full h-20 flex flex-row text-sm cursor-pointer ${backgroundColor}`} onClick={() => props.onClick(props.chatId)}>
      <div className="w-[15%] h-full flex items-center justify-center">
        <Avatar size='lg'/>
      </div>
      <div className="w-[85%] h-full px-2 flex flex-col">
        <div className="w-full h-1/2 flex flex-row justify-between items-center pt-4">
          <h1 className="text-base">
            {preview.name}
          </h1>
          <p>
            {formatDate(preview.lastMessageAt)}
          </p>
        </div>
        <div className="w-full h-1/2 flex flex-row justify-between items-center border-b border-gray-800 pb-4">
          <p>
            {preview.lastMessage}
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
    return date.toLocaleTimeString("de-DE", {hour: "2-digit", minute: "2-digit"});
  }
  else if(_date === todayDate - 1){
    return "Gestern";
  }
  else if(todayDate - _date < 7){
    return date.toLocaleDateString("de-DE", {weekday: "long"});
  }
  return date.toLocaleDateString("de-DE", {day: "numeric", month: "long"});
}