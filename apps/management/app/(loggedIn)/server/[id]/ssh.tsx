"use client"
import React from 'react'
import { Terminal } from 'xterm'
import Link from 'next/link'
import { io, Socket } from 'socket.io-client'

import 'xterm/css/xterm.css'

type Props = {
  url: string;
  id: string;
}

export default function ssh(props: Props) {
  let term: Terminal;
  let socket: Socket;

  const termRef = React.useRef<HTMLDivElement>(null);
  const [line, setLine] = React.useState('');

  React.useEffect(() => {
    if (!termRef.current) {
      return
    };

    socket = io(props.url, {
      query: {
        id: props.id,
        type: 'ssh'
      }
    });
    socket.connect();

    term = new Terminal();
    term.open(termRef.current);

    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('error', (err) => {
      console.error(err);
    });
    socket.on('message', (data) => {
      term.write(data);
    });

    term.onData((data) => {
      term.write(data);
      setLine(line + data);
    })
    term.onResize((size) => {
      socket.emit('resize', size);
    })
    term.onBinary((data) => {
      console.log(data);
    })
    term.onTitleChange((title) => {
      console.log(title);
    })
    term.onCursorMove((data) => {
    })
    term.onLineFeed(() => {
      term.writeln('');
      socket.send(line);
      setLine('');
    })
    term.onSelectionChange(() => {
    })
    term.onScroll(() => {
    })
    term.onKey((data) => {

    })
    term.onRender(() => {
    })

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