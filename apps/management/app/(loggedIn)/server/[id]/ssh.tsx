"use client"
import React from 'react'
import { Terminal } from 'xterm'
import Link from 'next/link'
import { io, Socket } from 'socket.io-client'

import 'xterm/css/xterm.css'

type Props = {
  id: string;
}

export default function ssh(props: Props) {
  let term: Terminal;
  let socket: Socket;

  const termRef = React.useRef<HTMLDivElement>(null);

  function attachTerm() {
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
  function attachSocket() {
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

  React.useEffect(() => {
    if (!termRef.current) {
      return
    };

    const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
    const url = `${protocol}://${process.env.NEXT_PUBLIC_WS_HOST}`

    socket = io(url, {
      query: {
        id: props.id,
        type: 'ssh'
      }
    });

    term = new Terminal();
    term.open(termRef.current);

    attachSocket();
    attachTerm();

    socket.connect();

    return () => {
      socket.disconnect();
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