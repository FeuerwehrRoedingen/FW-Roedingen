"use client"
import React from 'react'
import { Table as _Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { toast } from 'react-toastify'
import { BiRefresh } from 'react-icons/bi'
// @ts-ignore
import ping from 'web-pingjs'

import type { Server } from '../Server'
import 'status-indicator/styles.css'
import { Spacer } from '@nextui-org/react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'status-indicator': { 
        active?:       boolean;
        positive?:     boolean;
        intermediary?: boolean; 
        negative?:     boolean;
        pulse?:        boolean;
      }
    }
  }
}

type IProps = {
  servers: Server[];
}


export function Table(props: IProps) {
  
  const [servers, setServers] = React.useState<Server[]>(props.servers);

  async function deleteServer(id: number, name: string) {

    if(!confirm(`Are you sure you want to delete ${name}?`))
      return;

    toast.loading('Deleting server...', { toastId: 'deleteToast' });

    const res = await fetch(`/api/v1/servers/${id}`, {
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
        <TableCell className='flex flex-row h-full items-center'>
          <StatusIndicator status={server.status}/>    
          <Spacer x={2}/>  
          {server.status}
          <Spacer x={1}/>  
          <BiRefresh size='30px' onClick={() => updateServer(server.ip)} className='cursor-pointer duration-500 hover:scale-110 active:rotate-180 active:scale-95'/>
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

type IStatusIndicatorProps = {
  status: string;
}
function StatusIndicator(props: IStatusIndicatorProps){
  if(props.status === 'online')
    return <status-indicator intermediary pulse></status-indicator>
  
  if(props.status === 'slow')
    return <status-indicator intermediary pulse></status-indicator>
  
  if(props.status === 'offline')
    return <status-indicator negative pulse></status-indicator>

  return <status-indicator active></status-indicator>
}