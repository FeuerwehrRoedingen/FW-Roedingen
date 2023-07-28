import React from 'react'
import { VncScreen, VncScreenHandle } from 'react-vnc'

type Props = {
  url: string;
}

export default function Vnc(props: Props) {
  const vncRef = React.useRef<VncScreenHandle>(null);

  return (
    <div className='h-screen w-screen px-4 py-4'>
      <VncScreen
        ref={vncRef}
        url={props.url + '/vnc'}
        scaleViewport
      />
    </div>
  )
}