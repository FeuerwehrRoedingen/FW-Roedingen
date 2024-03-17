"use client"
import React from 'react'

import { HostInfo } from './hostInfo'
import { Logs } from './logs'
import { useAppDispatch } from '@/store'
import { updateStatus } from '@/store/reducer'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

type Props = {}

async function fetchStatus(){
  const res = await fetch('/api/v1/status');
  const json = await res.json();
  return json;
}

function page({}: Props) {

  const dispatch = useAppDispatch();

  const refresh = () => {
    fetchStatus()
    .then((data) =>{
      dispatch(updateStatus(data));
    });
  }

  React.useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='page'>
      <HostInfo />
      <Logs />
    </div>
  )
}

export default withPageAuthRequired(page, {
  returnTo: '/dashboard',
});