'use client'
import { NextUIProvider } from '@nextui-org/react'
import { UserProvider } from '@auth0/nextjs-auth0/client'

type IProps = {
  children: React.ReactNode
}

export default function(props: IProps){
  return (
    <UserProvider>
      <NextUIProvider>
        {props.children}
      </NextUIProvider>
    </UserProvider>
  )
}