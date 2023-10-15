"use client"
import React from 'react'

import BingoField from './bingoField'

import { eventMap, get25randomEvents } from './events'

export default function(){

  const initialEvents = get25randomEvents();
  const initialEntries = initialEvents.map((event, index) => {
    return {
      value: event,
      marked: false
    }
  });

  return (
    <div className="page flex items-center justify-center">
      <BingoField initialEntries={initialEntries}/>
    </div>
  )
}
