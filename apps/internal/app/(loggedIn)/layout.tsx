"use client"
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'

import MenuBar from '../../src/components/menuBar'
import { onMessage } from '../../src/firebase'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data, status } = useSession();
  if(status === 'authenticated'){

    onMessage(message => {
      console.log(message);
      toast.info(message.from);
    })

    return (
      <div className='main'>
        <MenuBar />
        <div className='mainPage'>
          {children}
        </div>
        <ToastContainer 
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    )
  }
  if(status === 'loading'){
    return <p>Loading...</p>
  }
  const router = useRouter();
  router.push('/login');
}
