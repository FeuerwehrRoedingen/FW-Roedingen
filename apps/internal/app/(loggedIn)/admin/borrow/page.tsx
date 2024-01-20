import React from 'react'

import { withAdminRoleRequired } from 'utils/wrapper/withRoleRequired'
import { Borrow, getAllBorrows } from 'utils/data/admin'
import BorrowList from './borrowList'

async function AdminBorrow() {

  const borrows = await getAllBorrows()
 
  return (
    <div className='w-full h-full p-4'>
      <BorrowList borrows={borrows} />
    </div>
  )
}

export default withAdminRoleRequired(AdminBorrow, {
  returnTo: '/admin/borrow',
});
