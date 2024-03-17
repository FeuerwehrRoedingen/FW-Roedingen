import React from 'react'
import dynamic from 'next/dynamic'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { eventMap, get25randomEvents } from './events'

const BingoField = dynamic(() => import('./bingoField'), { ssr: false });
const EventList = dynamic(() => import('./eventList'), { ssr: false });
const Settings = dynamic(() => import('./settings'), { ssr: false });

async function Page(){

  const initialEvents = get25randomEvents();
  const initialEntries = initialEvents.map((event, index) => {
    return {
      value: event,
      marked: false
    }
  });

  return (
    <div className="page p-8 flex flex-row items-center justify-center">
      <div className='w-2/3 h-full flex items-center flex-col'>
        <Settings />
        <div className='w-full h-full flex items-center justify-center'>
          <BingoField initialEntries={initialEntries}/>
        </div>
      </div>
      <div className='w-1/3 h-full'>
        <EventList />
      </div>
    </div>
  )
}

export default withPageAuthRequired(Page, {
  returnTo: '/games/bingo'
});
