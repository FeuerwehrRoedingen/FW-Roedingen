"use client"
import React from 'react'
import { Button, Link } from '@nextui-org/react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <Button color="danger" as={Link} href="/api/auth/login">
        Sign in with Auth0
      </Button>
    </div>
  )
}
