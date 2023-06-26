"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@nextui-org/react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <Button onClick={() => signIn('auth0', {callbackUrl: '/'})} shadow color="error" auto flat bordered>
          Sign in with Auth0
        </Button>
    </div>
  )
}
