import React from 'react'

import { Inputs } from './inputs'
import { Table } from './table'
import { Server } from '../../../prisma/client';

export const revalidate = 0;

async function fetchServers() : Promise<Server[]>{
  return fetch(`${process.env.NEXTAUTH_URL}/api/servers`, { next: {revalidate: 0}}).then((res) => res.json());
}

type IProps = {}
export default async function page({}: IProps) {

  let servers = await fetchServers();

  return (
    <div className='page'>
      <h1 className='w-full border-b-slate-700 border-b pl-4'>Servers</h1>
      <Inputs/>
      <Table servers={servers} />       
    </div>
  )
}
