import React from 'react'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

type IProps = {}

export default async function page({}: IProps) {
  const session = await getServerSession();

  if(!session) {
    redirect('/login');
  }
  redirect('/dashboard');
}
