import React from 'react'
import dynamic from 'next/dynamic'

import 'xterm/css/xterm.css'

type IProps = {
  params: {id: string}
}

export default function page(props: IProps) {


  const SSH = dynamic(() => import('./ssh'), { ssr: false });
  const VNC = dynamic(() => import('./vnc'), { ssr: false });
  
  return (
    <div className='page pl-0 pr-0'>
      <VNC id={props.params.id}/>
      <SSH id={props.params.id}/>
    </div>
  )
}
