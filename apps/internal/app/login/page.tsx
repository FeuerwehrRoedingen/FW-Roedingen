"use client";

import React from 'react'
import { signIn } from 'next-auth/react'

type Props = {}

export default function page(props: Props) {
  signIn('feuerwehr-roedingen');
  return (
    <div>
      redirecting...
    </div>
  )
}
