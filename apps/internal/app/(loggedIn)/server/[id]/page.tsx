"use client"

import 'xterm/css/xterm.css'
import './terminal.css'

import { usePathname } from 'next/navigation'
import React from 'react'

import Terminal from '../../../../src/components/terminal'
import { WS_API } from '../../../../src/api'

type Props = {}

function page(props: Props) {
  const path = usePathname()?.split('/')!;
  const name = path[path.length-1];
  const wsURL= WS_API+'/term/'+name
  return (
    <div className='page'>
      <Terminal wsurl={wsURL} className='terminal'/>
    </div>
  )
}

export default page;
