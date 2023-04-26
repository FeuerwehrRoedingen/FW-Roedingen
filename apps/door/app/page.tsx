"use client"
import React from 'react'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {}

export default function(props: Props) {

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if( status === 'authenticated' ){
    router.push('/home');
  }
  
  signIn("feuerwehr-roedingen");
  return <div>Loading...</div>
}
