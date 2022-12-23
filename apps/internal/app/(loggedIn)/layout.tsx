"use client"
import './index.css'
import 'reactjs-popup/dist/index.css'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import MenuBar from '../../src/menuBar'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data, status } = useSession();
  if(status === 'authenticated'){
    return (
      <div className='main'>
        <MenuBar />
        <div className='mainPage'>
          {children}
        </div>
      </div>
    )
  }
  if(status === 'loading'){
    return <p>Loading...</p>
  }
  const router = useRouter();
  router.push('/login');
}
