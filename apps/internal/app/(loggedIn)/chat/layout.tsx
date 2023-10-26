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
      <div className='w-1/4 h-full border-r border-gray-700 bg-gray-900'>
        <ChatList chats={chats}/>
      </div>
      <div className='w-3/4 h-full'>
        {props.children}
      </div>
    </div>
  )
}