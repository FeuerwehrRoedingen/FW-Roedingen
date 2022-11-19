"use client"

import { useSession } from 'next-auth/react'
import React from 'react'


type Props = {}

function Home(props: Props) {
  const { data, status } = useSession();
  return (
    <div>
      <h1>Home</h1>
      <div>hallo {data?.user.email}</div>
    </div>
  )
}

export default Home
