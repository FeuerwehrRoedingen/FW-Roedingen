"use client"
import React from 'react'
import { Terminal } from 'xterm'
import { VncScreen, VncScreenHandle } from 'react-vnc'

import type { Server } from '@/prisma/client'

import 'xterm/css/xterm.css'

type IProps = {
  params: {id: string}
}

async function getServer(id: string): Promise<Server|undefined|null> {
  return fetch(`/api/server/${id}`).then((res) => res.json());
}

export default function page(props: IProps) {

  const [server, setServer] = React.useState<Server|null|undefined>(undefined);

  const termRef = React.useRef<HTMLDivElement>(null);
  const vncRef = React.useRef<VncScreenHandle>(null);
  const term = new Terminal();
  const url = `ws://${server?.ip}:${server?.vncPort}`

  React.useEffect(() => {
    getServer(props.params.id).then((server) => {
      setServer(server);
    })
  }, [props.params.id]);

  React.useEffect(() => {
    if (termRef.current) {
      term.open(termRef.current);
    }
  }, []);

  return (
    <div className='page pl-0 pr-0'>
      <div className='h-screen w-screen px-4 py-4'>
        <VncScreen 
          ref={vncRef}
          url={url}
          scaleViewport
        />    
      </div>
      <div ref={termRef} className='p-2 border-2 border-slate-700'/>
    </div>
  )
}
