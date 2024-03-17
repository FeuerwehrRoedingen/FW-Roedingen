"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { type Borrow } from 'utils/data/admin'

type IProps = {
  borrows: Borrow[]
}

export default function(props: IProps) {

  console.log(JSON.stringify(props.borrows))

  const renderTableEntry = React.useCallback((borrow: Borrow) => {
    return (
      <TableRow key={borrow.id}>
        <TableCell>
          {borrow.borrowedAt}
        </TableCell>
        <TableCell>
          {borrow.returnedAt || 'Noch nicht zurückgegeben'}
        </TableCell>
        <TableCell>
          {borrow.userId}
        </TableCell>
      </TableRow>
    )
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableColumn>Ausgeliehen</TableColumn>
        <TableColumn>Zurückgegeben</TableColumn>
        <TableColumn>Benutzer</TableColumn>
      </TableHeader>
      <TableBody items={props.borrows}>
        {(item) => renderTableEntry(item)}
      </TableBody>
    </Table>
  )
}