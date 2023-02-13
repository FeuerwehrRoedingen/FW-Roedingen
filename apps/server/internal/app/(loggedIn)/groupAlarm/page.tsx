"use client"

import React, { useRef } from 'react'
import { VncScreen, VncScreenHandle } from 'react-vnc'

type Props = {}

function Home(props: Props) {

  const ref = useRef<VncScreenHandle>(null);

  return (
    <div className='frameContainer'>
      <iframe src='https://app.groupalarm.com/de/monitor/6956?view_token=4164fc5f-8c9c-51a6-5e20-10ea2132c811&theme=dark-theme' className='screen'/>
    </div>
  )
}

export default Home
