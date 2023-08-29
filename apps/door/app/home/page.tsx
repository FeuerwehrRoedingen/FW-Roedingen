"use client"

import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { redirect } from 'next/navigation';

type Props = {}

export default function page({}: Props) {

  const { user, error, isLoading } = useUser();

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>{error.message}</div>
  }

  if(!user)
    redirect('/')

  return (
    <div className='page'>
      <h1>Home</h1>
      <div>
        {user.email}
      </div>
      <a href="/api/auth/logout">sign out</a>
    </div>
  )
}