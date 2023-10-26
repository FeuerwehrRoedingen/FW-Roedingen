import { IChat } from "utils/chats"

import Chat from './chat'

type IProps = {
  chats: IChat[]
}
export default function(props: IProps){

  const chatElements = props.chats.map(chat => <Chat key={chat.id} chat={chat} />);

  return (
    <div>
      {chatElements}
    </div>
  )
}