"use client";
import React from 'react'
import { signIn } from 'next-auth/react'

type Props = {}

async function page({}: Props) {
  React.useEffect(() => {
    signIn('feuerwehr-roedingen');
  }, []);
  return (
    <div>...loading</div>
  )
}

export default page
