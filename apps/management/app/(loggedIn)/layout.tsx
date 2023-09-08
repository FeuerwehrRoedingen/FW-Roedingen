"use client"
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Provider as ReduxProvider } from 'react-redux'

import { Nav } from './nav'
import { makeStore } from '@/store'

type IProps = {
  children: React.ReactNode;
}

export default function (props: IProps) {
  return (
    <div className='h-screen w-screen'>
      <ReduxProvider store={makeStore()}>
        <Nav />
        {props.children}
        <ToastContainer theme='dark' />
      </ReduxProvider>
    </div>
  )
}
