import React from 'react'
import Provider from './provider'

import Navbar from './navbar'

type IProps = {
  children: React.ReactNode
}
export default function(props: IProps) {
  return (
    <Provider>
      <Navbar />
      <div className='w-screen h-[calc(100vh-65px)] overflow-scroll'>
        {props.children}
      </div>
    </Provider>
  )
}
