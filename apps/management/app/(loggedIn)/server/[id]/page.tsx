import React from 'react'
import dynamic from 'next/dynamic'

import 'xterm/css/xterm.css'

type IProps = {
  params: {id: string}
}

export default function page(props: IProps) {


  const SSH = dynamic(() => import('./ssh'), { ssr: false });
  const VNC = dynamic(() => import('./vnc'), { ssr: false });

  const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
  const url = `${protocol}://${process.env.NEXT_PUBLIC_WS_HOST}`

  return (
    <div className='page pl-0 pr-0'>
      {/**<VNC url={url} id={props.params.id}/>*/}
      <SSH url={url} id={props.params.id}/>
    </div>
  )
}
