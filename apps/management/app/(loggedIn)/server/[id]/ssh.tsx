"use client"
import React from 'react'
import useWebsocket from 'react-use-websocket'
import { Terminal } from 'xterm'

import 'xterm/css/xterm.css'

type Props = {
  url: string;
  id: string;
}

export default function ssh(props: Props) {
  let term: Terminal;

  const termRef = React.useRef<HTMLDivElement>(null);

  const { sendMessage, lastMessage, readyState } = useWebsocket(`${props.url}/?id=${props.id}&type=ssh`)
  console.log(readyState)

  React.useEffect(() => {
    if (!termRef.current) {
      return
    };
    term = new Terminal();
    term.open(termRef.current);
    term.onData((data) => {
      sendMessage(JSON.stringify({ type: 'data', data }));
    })
    term.onResize((size) => {
      sendMessage(JSON.stringify({ type: 'resize', cols: size.cols, rows: size.rows }));
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
    })
    term.onSelectionChange(() => {
    })
    term.onScroll(() => {
    })
    term.onKey((data) => {

    })
    term.onRender(() => {
    })

  }, [])
  React.useEffect(() => {
    if (!lastMessage) {
      return
    }
    const data = JSON.parse(lastMessage.data)
    if (data.type === 'data') {
      if(data.data === '\n')
        return term.writeln(''); // xterm.js doesn't like \n
      return term.write(data.data);
    }
    if (data.type === 'resize') {
      term.resize(data.cols, data.rows)
    }
  }, [lastMessage])
  return (
    <>
      <div ref={termRef} className='p-2 border-2 border-slate-700' />
    </>
  )
}