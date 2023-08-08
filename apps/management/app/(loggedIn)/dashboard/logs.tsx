"use client";
import React from 'react'
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'

import { AppState, useAppDispatch } from '@/store';
import { addLogs, setLogs } from '@/store/reducer';
import { getSocket } from '@/utils/socket';

type Props = {}


async function fetchLogs(){
  const res = await fetch('/api/v1/status/logs');
  return res.text();
}

export function Logs({}: Props) {
  const logs = useSelector((state: AppState) => state.logState.logs);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchLogs()
    .then((data) =>{
      dispatch(setLogs(data.split('\n')));
    })}, []);

  React.useEffect(() => {
    const socket = getSocket();

    socket.on('log', (data) => {
      dispatch(addLogs(data));
    });
  }, []);

  const logItems = logs.map((log, id) => {
    return (
      <TableRow key={id}>
        <TableCell>{log}</TableCell>
      </TableRow>
    )
  });

  return (
    <Table 
      isHeaderSticky
      classNames={{
        base: "max-h-[70%] overflow-scroll",
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        <TableColumn>Logs</TableColumn>
      </TableHeader>
      <TableBody>
        {logItems}
      </TableBody>
    </Table>
  )
}
