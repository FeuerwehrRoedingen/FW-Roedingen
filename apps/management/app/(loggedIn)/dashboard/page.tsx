"use client"
import React from 'react'

import { HostInfo } from './hostInfo'
import { Logs } from './logs'
import { useAppDispatch } from '@/store'
import { updateStatus } from '@/store/reducer'
import { securedPage } from '@/utils/securedPage'

type Props = {}

async function fetchStatus(){
  const res = await fetch('/api/v1/status');
  const json = await res.json();
  return json;
}

function page({}: Props) {

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus()
      .then((data) =>{
        dispatch(updateStatus(data));
      });
    }, 1_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='page'>
      <HostInfo />
      <Logs />
    </div>
  )
}

export default securedPage(page);
