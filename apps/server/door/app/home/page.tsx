"use client"

import React from 'react'
import { signOut, useSession } from 'next-auth/react'

type Props = {}

export default function page({}: Props) {

  const { data, status } = useSession();

  if(status === 'unauthenticated'){
    window.location.href = '/'
    return;
  }

  if(status === 'loading'){
    return <div>Loading...</div>
  }

  return (
    <div className='page'>
      <h1>Home</h1>
      <div>
        {data!.user.email}
      </div>
      <button onClick={() => signOut({ callbackUrl: '/', redirect: true})} >sign out</button>
    </div>
  )
}