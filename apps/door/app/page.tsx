"use client"
import React from 'react'
import { redirect } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'

type Props = {}

export default function(props: Props) {

  const { checkSession, isLoading, user } = useUser();
  
  checkSession();

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(user) {
    redirect('/app')
  }
  
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <a href="/api/login">login with Auth0</a>
    </div>
  )
}
