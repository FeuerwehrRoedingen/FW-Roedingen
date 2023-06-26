"use client"

import {NextUIProvider} from '@nextui-org/react'
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react'

type IProps = {
  children: React.ReactNode;
  session: Session|null|undefined;
}

export function Providers({children, session}: IProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </SessionProvider>
  )
}