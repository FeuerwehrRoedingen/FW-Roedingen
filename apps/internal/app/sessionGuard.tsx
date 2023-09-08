"use client"

import React from 'react'
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react'

type Props = {
  children: React.ReactNode;
  session: Session;
}
export default function(props:Props){
  return(
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  )
}