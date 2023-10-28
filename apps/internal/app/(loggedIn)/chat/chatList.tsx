"use client"

import React from 'react';
import { IoIosSearch } from "react-icons/io"
import { CgSortAz } from "react-icons/cg"
import { useRouter, usePathname } from 'next/navigation';

import { IChat } from "utils/chats"
import Chat from './chat'

type IProps = {
  chats: IChat[]
}
export default function(props: IProps){

  const [focused, setFocused] = React.useState(false);
  const { push } = useRouter();

  const handleFocus = () => {
    setFocused(true);
  }
  const handleClick = (id: string) => {
    push(`/chat/${id}`);
  }
  
  const pathname = usePathname();
  const chatId = pathname.split('/').length === 3 ? pathname.split("/")[2]: null;

  const chatElements = props.chats.map(chat => <Chat key={chat.id} chatId={chat.id} active={chatId === chat.id} onClick={handleClick}/>);
  let leftIcon = <IoIosSearch size={20} className="cursor-pointer"/>;

  return (
    <div className="">
      <div className='p-2'>
        <div className="w-full h-10 p-2 rounded-lg bg-gray-900 flex flex-row items-center">
          {leftIcon}
          <input 
            placeholder={focused ? "": "Chats dursuchen"}
            className="w-full h-full bg-transparent text-silver text-sm px-2 rounded-lg focus:outline-none"
            onFocus={handleFocus}
          />
          <CgSortAz size={30} className="cursor-pointer"/>
        </div>
      </div>
      {chatElements}
    </div>
  )
}