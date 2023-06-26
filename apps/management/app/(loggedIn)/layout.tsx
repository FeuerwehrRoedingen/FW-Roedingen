"use client"
import React from 'react'
import { ToastContainer } from 'react-toastify'

import { Nav } from '../../components'

type IProps = {
  children: any;
}

export default function(props: IProps) {
  return (
    <div>
      <Nav/>
      {props.children}
      <ToastContainer theme='dark'/>
    </div>
  )
}
