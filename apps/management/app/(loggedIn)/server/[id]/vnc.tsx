"use client"
import React from 'react'
import { VncScreen, VncScreenHandle } from 'react-vnc'

type Props = {
  id: string;
}

export default function Vnc(props: Props) {
  const vncRef = React.useRef<VncScreenHandle>(null);
  const [wsUrl, setWsUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/vnc/${props.id}`, {method: 'POST'})
      .then(res => res.json())
      .then(data => {
        setWsUrl(`${protocol}://${data.host}:${data.port}?id=${props.id}`)
      });
  }, [props.id]);

  if(!wsUrl) {
    return (
      <div className='h-[85vh] w-screen px-4 py-4 flex items-center justify-center'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }
  return (
    <div className='h-screen w-screen px-4 py-4'>
      <VncScreen
        ref={vncRef}
        url={wsUrl}
        scaleViewport
        debug
        rfbOptions={{
          credentials: {
            password: 'foobar'
          }
        }}
      />
    </div>
  )
}
