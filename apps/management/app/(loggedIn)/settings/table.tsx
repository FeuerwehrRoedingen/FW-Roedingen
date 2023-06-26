"use client"
import React from 'react'
import { Table as _Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import type { Server } from '../../../prisma/client'

type IProps = {
  servers: Server[]
}

export function Table({ servers }: IProps) {

  const serverRows: any = servers.map((server) => {
    return (
      <TableRow key={server.id}>
        <TableCell>{server.name}</TableCell>
        <TableCell>{`${server.ip}:${server.port}`}</TableCell>
        <TableCell>{server.status}</TableCell>
      </TableRow>
    );
  });

  return (
    <_Table
      aria-label="Servers"
    >
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Address</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {serverRows}
      </TableBody>
    </_Table>
  )
}
