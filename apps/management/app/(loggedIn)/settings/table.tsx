"use client"
import React from 'react'
import { Table as _Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Tooltip } from '@nextui-org/tooltip'
import { toast } from 'react-toastify'
import { BiRefresh } from 'react-icons/bi'
import { Spacer } from '@nextui-org/spacer'
import { useSelector } from 'react-redux'

// @ts-ignore
import ping from 'web-pingjs'

import type { Server } from '@/utils/Server'
import { AppState, useAppDispatch } from '@/store'
import { setSelectedServer, setServers } from '@/store/reducer'
import { StatusIndicator } from './statusIndicator'
import { DeleteIcon, EditIcon } from './icons'
import 'status-indicator/styles.css'

async function fetchServers(): Promise<Server[]> {
  return fetch(`/api/v1/servers`, { next: { revalidate: 0 } }).then((res) => res.json());
}

type IProps = {}
export function Table(props: IProps) {
  const { servers } = useSelector((state: AppState) => state.serversState);
  const dispatch = useAppDispatch();

  async function deleteServer(id: number, name: string) {

    if (!confirm(`Are you sure you want to delete ${name}?`))
      return;

    toast.loading('Deleting server...', { toastId: 'deleteToast' });

    const res = await fetch(`/api/v1/servers/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok)
      return toast.update('deleteToast', { render: await res.text(), type: 'error', isLoading: false, autoClose: 3000 });

    res.json()
      .then((res) => {
        setServers(servers.filter((server) => server.id !== res.id));
        toast.update('deleteToast', { render: 'Server deleted successfully!', type: 'success', isLoading: false, autoClose: 3000 });
      })

  }
  async function updateServerStatus(address: string) {
    function _ping(): Promise<'offline' | 'slow' | 'online'> {
      return new Promise<'offline' | 'slow' | 'online'>((resolve, reject) => {
        ping(`http://${address}`, 0.3)
          .then((res: number) => {
            if (res > 5_000) {
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

    if (server?.status === res)
      return;
  }

  React.useEffect(() => {
    fetchServers()
      .then((data) => {
        dispatch(setServers(data));
      });
  }, []);

  const serverRows: any = servers.map((server) => {
    return (
      <TableRow key={server.id}>
        <TableCell>
          <p className="text-bold text-sm capitalize">{server.name}</p>
        </TableCell>
        <TableCell>
          <p className="text-bold text-sm capitalize">{server.ip}</p>
        </TableCell>
        <TableCell>
          <p className="text-bold text-sm capitalize">{server.sshPort}</p>
        </TableCell>
        <TableCell>
          <p className="text-bold text-sm capitalize">{server.vncPort}</p>
        </TableCell>
        <TableCell >
          <div className='flex flex-row h-full items-center'>
            <StatusIndicator status={server.status} />
            <Spacer x={2} />
            <p className="text-bold text-sm capitalize">{server.status}</p>
            <Spacer x={1} />
            <BiRefresh
              size='25px'
              onClick={() => updateServerStatus(server.ip)}
              className='cursor-pointer duration-500 hover:scale-110 active:rotate-180 active:scale-95'
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="relative flex items-center gap-2">
            <Tooltip content={`Edit ${server.name}`}>
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => dispatch(setSelectedServer(server))}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content={`delete ${server.name}`}>
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteServer(server.id, server.name)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <_Table
      aria-label="Servers"
      isCompact
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
