"use client"
import React from 'react'
import { signOut, useSession } from 'next-auth/react'

const logout = () => {
  console.log('logging out')
  fetch('https://api.feuerwehr-roedingen.de/logout', {
    method: 'DELETE'
  })
  signOut();
}

type Props = {}

export default function Profile({}: Props) {
  const { data, status } = useSession();
  return (
    <div>page</div>
  )
}

