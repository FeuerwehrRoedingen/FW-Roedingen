import React from 'react'

import { database } from '../../../server/DB'

import { Inputs } from './inputs'
import { Table } from './table'

export const revalidate = 0;

async function fetchServers() {
  return database.getServers()
}

type IProps = {}
export default async function page({}: IProps) {

  const servers = await fetchServers();

  return (
    <div className='page'>
      <h1 className='w-full border-b-slate-700 border-b pl-4'>Servers</h1>
      <Inputs/>
      <Table servers={servers}/>       
    </div>
  )
}
