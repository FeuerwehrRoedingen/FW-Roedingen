"use client"

import 'xterm/css/xterm.css'
import './terminal.css'

import { usePathname } from 'next/navigation'
import React from 'react'

import Terminal from '../../../../components/terminal'

type Props = {}

function page(props: Props) {
  const path = usePathname().split('/');
  const name = path[path.length-1];
  const wsURL='wss://10.21.21.22:3024/term/'+name
  return (
    <div className='page'>
      <Terminal wsUrl={wsURL} className='terminal'/>
    </div>
  )
}

export default page;
