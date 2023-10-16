"use client"
import React from 'react'
import dynamic from 'next/dynamic'

import { get25randomEvents } from './events'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BingoField = dynamic(() => import('./bingoField'), { ssr: false });
const EventList = dynamic(() => import('./eventList'), { ssr: false });
const Settings = dynamic(() => import('./settings'), { ssr: false });

export default function(){

  const initialEvents = get25randomEvents();
  const initialEntries = initialEvents.map((event, index) => {
    return {
      value: event,
      marked: false
    }
  });

  return (
    <div className="page flex flex-row items-center justify-center">
      <div className='w-2/3 h-full'>
        <Settings />
        <div className='w-full h-full flex items-center justify-center'>
          <BingoField initialEntries={initialEntries}/>
        </div>
      </div>
      <div className='w-1/3 h-full'>
        <EventList />
      </div>
      <ToastContainer 
        position="top-right"
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
