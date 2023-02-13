"use client";

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { VscClose } from 'react-icons/vsc';
import { WS_API } from '../api';

type ChatsProps = {}

type ChatData = {
  with: string;
  lastMessage: string;
  imageUrl: string;
}

export default function chats(props: ChatsProps) {
  const session = useSession();
  const [chats, setChats] = useState<ChatData[]>([])
  
  useEffect(() => {
    let socket = new WebSocket(WS_API+'/chat');

    socket.onmessage = event => {
      console.log(event.data)
    }

    return () => {
      socket.close();
    }
  })

  const items = chats.length === 0 ? 
    <div>
      <h1>Keine Chats</h1>
    </div>:
    chats.map(elem => {
      return (
        <Chat 
          {...elem}
        />
      )
    }) 

  return (
    <div>
      {items}
    </div>
  )
}

function Chat(props: ChatData){

  return (
    <div>
      <img src={props.imageUrl} />
      <div>
        <span>{props.with}</span>
        <span>{props.lastMessage}</span>
      </div>
      <VscClose />
    </div>
  )
}