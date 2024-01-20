import React from 'react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

import { withAdminRoleRequired } from 'utils/wrapper/withRoleRequired'
import { getAllBorrows } from 'utils/data/admin'

async function AdminBorrow() {

  const borrows = await getAllBorrows()

  console.log(borrows)

  const rows = borrows.map(borrow => {
    return (
      <TableRow key={borrow.id}>
        <TableCell>{borrow.borrowedAt}</TableCell>
        <TableCell>{borrow.returnedAt}</TableCell>
        <TableCell>{borrow.user}</TableCell>
      </TableRow>
    )
  })

  console.log(rows)

  return (
    <div className='w-full h-full p-4'>
      <Table>
        <TableHeader>
          <TableColumn>Ausgeliehen</TableColumn>
          <TableColumn>Zurückgegeben</TableColumn>
          <TableColumn>Benutzer</TableColumn>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </div>
  )
}

export default withAdminRoleRequired(AdminBorrow, {
  returnTo: '/admin/borrow',
});
