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
  wsurl: string;
}

function Xterm({
  wsurl,
  ...props
}: Props & JSX.IntrinsicElements["div"]) {

  const divRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Terminal>()

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsurl)

  useEffect(() => {
    if (!termRef.current) {

      const loadAddons = () => {
        const canvasAddon = new CanvasAddon();
        term.loadAddon(canvasAddon);

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();

        const searchAddon = new SearchAddon();
        term.loadAddon(searchAddon);

        const serializeAddon = new SerializeAddon();
        term.loadAddon(serializeAddon);

        const unicode11Addon = new Unicode11Addon();
        term.loadAddon(unicode11Addon);

        // const webglAddon = new WebglAddon();
        // webglAddon.onContextLoss(e => {
        //   webglAddon.dispose();
        // })
        // term.loadAddon(webglAddon);

        
        sendMessage(`resize:${term.cols}:${term.rows}`)
      }

      const attachListeners = () => {
        var cmd = '';
        var index = 0;

        term.onKey((data) => {
          if (data.domEvent.key === 'Enter') {
            sendMessage(cmd);
            cmd = '';
            index = 0;
            term.writeln('');
            return;
          }
          if (data.domEvent.key === 'Backspace') {
            term.write('\b \b');
            cmd = cmd.slice(0, -1);
            index -= 1;
            return;
          }
          if (data.domEvent.key === 'ArrowDown') {
            //TODO command down
            return;
          }
          if (data.domEvent.key === 'ArrowUp') {
            //TODO command up
            return;
          }
          if (data.domEvent.key === 'ArrowLeft') {
            term.write('\b');
            index -= 1;
            return;
          }
          if (data.domEvent.key === 'ArrowRiht') {
            //TODO go right
            return;
          }
          cmd += data.key;
          term.write(data.key);
        });
        term.onResize(dim => {
          sendMessage(`resize:${dim.cols}:${dim.rows}`)
        })
        term.attachCustomKeyEventHandler(event => {
          if (event.ctrlKey && event.key === 'c') {
            //TODO copy
            return false
          }
          if (event.ctrlKey && event.key === 'v') {
            navigator.clipboard.readText()
              .then(res => {
                term.write(res);
              })
            return false
          }
          return true;
        })
      }

      const xtermjsTheme = {
        //misc
        foreground: '#f1f1f1',
        background: '#111118',
        selectionBackground: '#28b9ff',
        //bright
        brightBlack: '#666666',
        brightBlue: '#5c78ff',
        brightCyan: '#5ac8ff',
        brightGreen: '#905aff',
        brightMagenta: '#5ea2ff',
        brightRed: '#ba5aff',
        brightWhite: '#ffffff',
        brightYellow: '#657b83',
        //normal
        black: '#121212',
        blue: '#2b4fff',
        cyan: '#28b9ff',
        green: '#7129ff',
        magenta: '#2883ff',
        red: '#a52aff',
        white: '#f1f1f1',
        yellow: '#3d2aff',
      };

      const term = (termRef.current = new Terminal({
        allowProposedApi: true,
        convertEol: true,
        fontFamily: 'Hack, mono',
        fontSize: 16,
        fontWeight: '700',
        theme: xtermjsTheme
      }));

      attachListeners();
      term.open(divRef.current!);
      loadAddons();

      term.writeln(`connected to ${wsurl}`);
      term.focus();
    }

    if (lastMessage !== null) {
      termRef.current!.write(lastMessage.data);
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
