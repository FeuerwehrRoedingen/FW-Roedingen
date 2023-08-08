"use client"
import React from 'react'
import { Terminal } from 'xterm'
import Link from 'next/link'
import type { Socket } from 'socket.io-client'

import { getSocket } from '@/utils/socket'
import 'xterm/css/xterm.css'

type Props = {
  id: string;
}

export default function ssh(props: Props) {
  const termRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!termRef.current) {
      return
    };

    const term = new Terminal();
    term.open(termRef.current);

    const socket = getSocket();

    attachSocket(socket, term);
    attachTerm(socket, term);

    socket.emit('ssh', props.id);

    return () => {
      term.dispose();
    }
  }, [])

  return (
    <>
      <Link href='https://www.nerdfonts.com/assets/css/hack.css' rel='stylesheet' type='text/css'/>
      <div ref={termRef} className='p-2 border-2 border-slate-700 font-[hack]'/>
    </>
  )
}

function attachTerm(socket: Socket, term: Terminal) {
  term.onData((data) => {
    if(data >= ' ' && data <= '~')
      socket.send(data);
  })
  term.onResize((size) => {
    socket.emit('resize', size);
  })
  term.onBinary((data) => {
    console.log(data);
  })
  term.onTitleChange((title) => {

  })
  term.onCursorMove((data) => {
  })
  term.onLineFeed(() => {

  })
  term.onSelectionChange(() => {
  })
  term.onScroll(() => {
  })
  term.onKey((data) => {
    if(data.domEvent.key === 'Backspace') {
      socket.emit('backspace', '');
    }
    else if(data.domEvent.key === 'Enter') {
      socket.emit('enter', '');
    }
  })
  term.onRender(() => {
  })
}
function attachSocket(socket: Socket, term: Terminal) {
  socket.on('connect', () => {
    term.clear();
  })
  socket.on('message', (data) => {
    term.write(data);
  })
  socket.on('disconnect', (reason) => {
    console.log(reason);
    term.write('\r\n\r\n[Disconnected]\r\n');
  })
  socket.on('error', (err) => {
    console.error(err);
    term.dispose();
  })
  socket.on('resize', (size) => {
    term.resize(size.cols, size.rows);
  });
  socket.on('backspace', (data) => {
    term.write('\b \b');
  });
  socket.on('enter', (data) => {
    term.write('\r\n');
  });
}

