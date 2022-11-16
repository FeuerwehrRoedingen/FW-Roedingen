"use client";

import React, { useEffect, useRef } from 'react'

import { Terminal } from 'xterm'
import { CanvasAddon } from 'xterm-addon-canvas'
import { FitAddon } from "xterm-addon-fit"
import { SearchAddon } from 'xterm-addon-search'
import { SerializeAddon } from 'xterm-addon-serialize'
import { Unicode11Addon } from 'xterm-addon-unicode11'
import { WebglAddon } from 'xterm-addon-webgl'
import useWebSocket from "react-use-websocket"

type Props = {
  wsUrl: string;
}

function Xterm({
  wsUrl,
  ...props
}: Props & JSX.IntrinsicElements["div"]) {

  const divRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Terminal>()

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl)

  useEffect(() => {
    if(!termRef.current){
      const term = (termRef.current = new Terminal({
        allowProposedApi: true,
        convertEol: true,
        fontFamily: 'Hack Nerd Font'
      }));

      var cmd = '';

      term.onKey((data) => {
        if(data.domEvent.key === 'Enter'){
          sendMessage(cmd);
          cmd = '';
          term.writeln('');
          return;
        }
        if(data.domEvent.key === 'Backspace'){
          term.write('\b \b');
          cmd = cmd.slice(0,-1);
          return;
        }
        if(data.domEvent.key === 'ArrowDown'){
          //TODO command down
          return;
        }
        if(data.domEvent.key === 'ArrowUp'){
          //TODO command up
          return;
        }
        if(data.domEvent.key === 'ArrowLeft'){
          //TODO go left
          return;
        }
        if(data.domEvent.key === 'ArrowRight'){
          //TODO go right
          return;
        }
        cmd += data.domEvent.key;
        term.write(data.domEvent.key);
      });
      term.onResize(dim => {
        sendMessage(`resize:${dim.cols}:${dim.rows}`)
      })
      term.attachCustomKeyEventHandler( event => {
        if(event.ctrlKey && event.key === 'c'){
          //TODO copy
          return false
        }
        if(event.ctrlKey && event.key === 'v'){
          navigator.clipboard.readText()
            .then(res => {
              term.write(res);
            })
          return false
        }
        return true;
      })

      term.open(divRef.current!);

      const canvasAddon = new CanvasAddon();
      term.loadAddon(canvasAddon);

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      const searchAddon = new SearchAddon();
      term.loadAddon(searchAddon);

      const serializeAddon = new SerializeAddon();
      term.loadAddon(serializeAddon);

      const unicode11Addon = new Unicode11Addon();
      term.loadAddon(unicode11Addon);

      const webglAddon = new WebglAddon();
      webglAddon.onContextLoss(e => {
        webglAddon.dispose();
      })
      term.loadAddon(webglAddon);
    
      fitAddon.fit();
      sendMessage(`resize:${term.cols}:${term.rows}`)
  
      term.writeln(`connected to ${wsUrl}`);
      term.focus();
    }

    if (lastMessage !== null) {
      termRef.current.write(lastMessage.data);
    }
  }, [sendMessage, lastMessage])

  const readyStateText = {
    [WebSocket.CONNECTING]: "Connecting",
    [WebSocket.OPEN]: "Open",
    [WebSocket.CLOSING]: "Closing",
    [WebSocket.CLOSED]: "Closed"
  }[readyState];
  
  return (
    <div  {...props}>
      <div id='terminal' ref={divRef}></div>
    </div>
  )
}

export default Xterm
