import React from 'react'
import dynamic from 'next/dynamic'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import 'xterm/css/xterm.css'

const SSH = dynamic(() => import('./ssh'), { ssr: false });
const VNC = dynamic(() => import('./vnc'), { ssr: false });

type IProps = {
  params?: {id?: string}
}
async function page(props: IProps) {

  
  return (
    <div className='page pl-0 pr-0 pt-0'>
      <VNC id={props.params!.id!}/>
      <SSH id={props.params!.id!}/>
    </div>
  )
}

export default withPageAuthRequired(page, {
  returnTo: `/dashboard`
});
