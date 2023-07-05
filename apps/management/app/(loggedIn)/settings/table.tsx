"use client"
import React from 'react'
import { Table as _Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import type { Server } from '../../../prisma/client'
import { toast } from 'react-toastify'

type IProps = {
  servers: Server[];
}


export function Table(props: IProps) {
  
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

  const [servers, setServers] = React.useState<Server[]>(props.servers);


  const serverRows: any = servers.map((server) => {
    return (
      <TableRow key={server.id}>
        <TableCell>{server.name}</TableCell>
        <TableCell>{server.ip}</TableCell>
        <TableCell>{server.sshPort}</TableCell>
        <TableCell>{server.vncPort}</TableCell>
        <TableCell>{server.status}</TableCell>
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
