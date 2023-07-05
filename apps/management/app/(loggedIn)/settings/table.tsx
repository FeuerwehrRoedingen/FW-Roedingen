"use client"
import React from 'react'
import { Table as _Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { toast } from 'react-toastify'
import { BiRefresh } from 'react-icons/bi'
// @ts-ignore
import { ping } from 'web-pingjs'

import type { Server } from '../../../prisma/client'

type IProps = {
  servers: Server[];
}


export function Table(props: IProps) {
  
  const [servers, setServers] = React.useState<Server[]>(props.servers);

  async function deleteServer(id: number, name: string) {

    if(!confirm(`Are you sure you want to delete ${name}?`))
      return;

    toast.loading('Deleting server...', { toastId: 'deleteToast' });

    const res = await fetch(`/api/servers/${id}`, {
      method: 'DELETE',
    });

    if(!res.ok)
      return toast.update('deleteToast', { render: await res.text(), type: 'error', isLoading: false, autoClose: 3000 });

    res.json()
      .then((res) => {
        setServers(servers.filter((server) => server.id !== res.id));
        toast.update('deleteToast', { render: 'Server deleted successfully!', type: 'success', isLoading: false, autoClose: 3000 });
      })

  }
  async function updateServer(address: string) {
    function _ping(): Promise<'offline'|'slow'|'online'>{
      return new Promise<'offline'|'slow'|'online'>((resolve, reject) => {
      ping(`http://${address}`, 0.3)
        .then((res: number) => {
          if(res > 5_000) {
            resolve('slow');
          }
          resolve('online');
        })
        .catch((err: string) => {
          resolve('offline');
        });
      });
    }

    const res = await _ping();

    const server = servers.find((server) => server.ip === address);

    if(server?.status === res)
      return;
  }

  const serverRows: any = servers.map((server) => {
    return (
      <TableRow key={server.id}>
        <TableCell>{server.name}</TableCell>
        <TableCell>{server.ip}</TableCell>
        <TableCell>{server.sshPort}</TableCell>
        <TableCell>{server.vncPort}</TableCell>
        <TableCell className='flex flex-row'>
          {server.status}
          <BiRefresh size='41px' onClick={() => updateServer(server.ip)}/>
        </TableCell>
        <TableCell>
          <button onClick={() => deleteServer(server.id, server.name)}>Delete</button>
        </TableCell>
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
        <TableColumn>SSH Port</TableColumn>
        <TableColumn>VNC Port</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {serverRows}
      </TableBody>
    </_Table>
  )
}
