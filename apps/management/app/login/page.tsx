"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@nextui-org/react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <Button onPress={() => signIn('auth0', {callbackUrl: '/'})} color="danger">
          Sign in with Auth0
        </Button>
    </div>
  )
}
