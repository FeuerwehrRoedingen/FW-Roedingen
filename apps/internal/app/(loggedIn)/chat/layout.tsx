import React from 'react';

import ChatList from './chatList';
import { getChats } from 'utils/chats'

type IProps = {
  children: React.ReactNode;
};
export default async function(props: IProps){

  const chats = await getChats();

  return(
    <div className='w-full h-full flex flex-row'>
      <div className='w-1/3 h-full border-r border-gray-900 bg-gray-950'>
        <ChatList chats={chats}/>
      </div>
      <div className='w-2/3 h-full'>
        {props.children}
      </div>
    </div>
  )
}
