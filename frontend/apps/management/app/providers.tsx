"use client"

import {NextUIProvider} from '@nextui-org/react'
import { UserProvider } from '@auth0/nextjs-auth0/client';

type IProps = {
  children: React.ReactNode;
}

export function Providers({children}: IProps) {
  return (
    <UserProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </UserProvider>
  )
}
