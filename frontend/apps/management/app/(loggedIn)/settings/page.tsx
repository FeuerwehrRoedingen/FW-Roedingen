import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { Inputs } from './inputs'
import { Table } from './table'
import { Modal } from './modal';

export const revalidate = 0;

type IProps = {}
async function page({}: IProps) {

  return (
    <div className='page'>
      <Modal />
      <h1 className='w-full border-b-slate-700 border-b pl-4'>Servers</h1>
      <Inputs/>
      <Table />       
    </div>
  )
}

export default withPageAuthRequired(page, {
  returnTo: '/settings',
});
