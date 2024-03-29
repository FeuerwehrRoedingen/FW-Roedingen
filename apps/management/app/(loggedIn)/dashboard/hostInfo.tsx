"use client"
import React from 'react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'

import { AppState } from '@/store'

const Usage = dynamic(() => import('./usage'), { ssr: false });

type Props = {}
export function HostInfo({ }: Props) {
  const status = useSelector((state: AppState) => state.statusState);

  const StatusItems = () => {
    if (!status) return (<></>);

    const cpuModel = status.cpus.length > 0 ? status.cpus[0].model : '';
    const cpuText = `${status.cpus.length}x ${cpuModel}`;

    return (
      <Table
        classNames={{
          base: "w-[60%]",
        }}
        aria-label='Host-Info'
      >
        <TableHeader>
          <TableColumn>Host Info</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Hostname</TableCell>
            <TableCell>{status?.hostname}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>RAM</TableCell>
            <TableCell>{status?.totalmem / 1024 / 1024 / 1024} GB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>CPU</TableCell>
            <TableCell>{cpuText}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <div className='h-[30%] w-full flex flex-row items-center'>
      <StatusItems />
      <Usage />
    </div>
  )
}
