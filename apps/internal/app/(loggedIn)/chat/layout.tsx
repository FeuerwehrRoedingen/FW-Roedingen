import './chat.css'

import React from 'react'

import Chats from '../../../components/chatList'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='cContainer'>
      <div className='cLeft'>
      </div>
      <div className='cRight'>
        {children}
      </div>
    </div>
  )
}
