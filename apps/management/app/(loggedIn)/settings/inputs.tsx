"use client"
import React from 'react'
import { Button, Input, Spacer } from '@nextui-org/react'
import { toast } from 'react-toastify'

const createToastId = 'toastID_01';
const testToastId = 'toastID_02';
const validKey = 'validInput_01';

type IProps = {}

export function Inputs(props: IProps) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [ip, setIp] = React.useState('');
  const [port, setPort] = React.useState('22');

  const handleClick = () => {
    const res = checkInputs(name, ip, port);

    toast.loading('Adding server...', { toastId: createToastId });

    if(res !== validKey) {
      toast.update(createToastId, { render: res, type: 'error', isLoading: false, autoClose: 3000 });
      return;
    }

    setIsLoading(true);
    
    addServer(name, ip, port)
      .then(() => {
        toast.update(createToastId, { render: 'Server added successfully!', type: 'success', isLoading: false, autoClose: 3000 });
        toast.loading('Testing server...', { toastId: testToastId });
        return checkServer(ip, port);
      })
      .then(() => {
        toast.update(testToastId, { render: 'Server is online!', type: 'success', isLoading: false, autoClose: 3000 });
        setIsLoading(false);
      })
      .catch((err) => {
        toast.update(createToastId, { render: err, type: 'error', isLoading: false, autoClose: 3000 });
        toast.update(testToastId, { render: err, type: 'error', isLoading: false, autoClose: 3000 });
      });
  }

  return (
    <div>
        <Spacer y={2.5} />
        <div className='flex flex-row h-fit items-center'>
          <p>Add a Server</p>
          <Spacer x={1} />
          <Input 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Spacer x={1} />
          <Input
            value={ip}
            onChange={e => setIp(e.target.value)}
          />
          <Spacer x={1} />
          <Input
            type='number'
            value={port}
            onChange={e => setPort(e.target.value)}
          />
          <Spacer x={1} />
          <Button
            isLoading={isLoading}
            onPress={handleClick}
          >
            Add
          </Button>
        </div>
        <Spacer y={2.5} />
      </div>
  )
}
  
function checkInputs(name: string, ip: string, port: string): string{
  if(name.length === 0) 
    return 'Name cannot be empty.';
  if(ip.length === 0) 
    return 'IP/Hostname cannot be empty.';
  if(port < '1' || port > '65535')
    return 'Port must be between 1 and 65535.';
  return validKey;
}

async function addServer(name: string, ip: string, port: string) {
  return new Promise<void>(async (resolve, reject) => {
    setTimeout(() => reject('Server did not respond in time.'), 10_000);
    
    const response = await fetch('/api/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        ip,
        port
      })
    });

    if(!response.ok)
      reject('Server responded with an error.');
    resolve();
  });
}

async function checkServer(ip: string, port: string) {
  
}