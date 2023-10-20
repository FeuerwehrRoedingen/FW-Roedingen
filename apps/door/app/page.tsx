"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'

type Props = {}

export default function(props: Props) {

  const { error, isLoading, user } = useUser();
  
  console.error(error);

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(user) {
    redirect('/home')
  }
  
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <a href="/api/auth/login">login with Auth0</a>
    </div>
  )
}
