"use client"
import React from 'react'
import { Button, Input, Spacer } from '@nextui-org/react'
import { toast } from 'react-toastify'

const createToastId = 'toastID_01';
const testSSHToastId = 'toastID_02';
const testVNCToastId = 'toastID_03';
const validKey = 'validInput_01';

type IProps = {}

export function Inputs(props: IProps) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [ip, setIp] = React.useState('');
  const [sshPort, setSshPort] = React.useState('22');
  const [vncPort, setVncPort] = React.useState('5900');

  const handleClick = () => {
    const res = checkInputs(name, ip, sshPort, vncPort);

    toast.loading('Adding server...', { toastId: createToastId });

    if (res !== validKey) {
      toast.update(createToastId, { render: res, type: 'error', isLoading: false, autoClose: 3000 });
      return;
    }

    setIsLoading(true);

    addServer(name, ip, sshPort, vncPort)
      .then(() => {
        toast.update(createToastId, { render: 'Server added successfully!', type: 'success', isLoading: false, autoClose: 3000 });
        toast.loading('Testing SSH server...', { toastId: testSSHToastId });
        return checkSSHServer(ip, sshPort);
      })
      .then(() => {
        toast.update(testSSHToastId, { render: 'SSH server working', type: 'success', isLoading: false, autoClose: 3000 });
        toast.loading('Testing SSH server...', { toastId: testVNCToastId });
        return checkVNCServer(ip, vncPort);
      })
      .then(() => {
        toast.update(testVNCToastId, { render: 'VNC server working', type: 'success', isLoading: false, autoClose: 3000 });
        window.location.reload();
      })
      .catch((err) => {
        toast.update(createToastId, { render: err, type: 'error', isLoading: false, autoClose: 3000 });
        toast.update(testSSHToastId, { render: err, type: 'error', isLoading: false, autoClose: 3000 });
        toast.update(testVNCToastId, { render: err, type: 'error', isLoading: false, autoClose: 3000 });
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Spacer y={2.5} />
      <div className='flex flex-row h-20 items-center justify-evenly'>
        <p className='w-fit'>Add a Server</p>
        <Spacer x={1} />
        <Input
          variant='bordered'
          labelPlacement='outside'
          label='Name'
          size='sm'
          className=' w-50'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Spacer x={1} />
        <Input
          variant='bordered'
          labelPlacement='outside'
          size='sm'
          className=' w-50'
          label='IP/Hostname'
          value={ip}
          onChange={e => setIp(e.target.value)}
        />
        <Spacer x={1} />
        <Input
          variant='bordered'
          labelPlacement='outside'
          size='sm'
          className=' w-50'
          label='SSH Port'
          type='number'
          value={sshPort}
          onChange={e => setSshPort(e.target.value)}
        />
        <Spacer x={1} />
        <Input
          variant='bordered'
          labelPlacement='outside'
          size='sm'
          className=' w-50'
          label='VNC Port'
          type='number'
          value={vncPort}
          onChange={e => setVncPort(e.target.value)}
        />
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

function checkInputs(name: string, ip: string, sshPort: string, vncPort: string): string {
  if (name.length === 0)
    return 'Name cannot be empty.';
  if (ip.length === 0)
    return 'IP/Hostname cannot be empty.';
  if (sshPort < '1' || sshPort > '65535')
    return 'SSH port must be between 1 and 65535.';
  if (vncPort < '1' || vncPort > '65535')
    return 'VNC port must be between 1 and 65535.';
  return validKey;
}

async function addServer(name: string, ip: string, sshPort: string, vncPort: string) {
  return new Promise<void>(async (resolve, reject) => {
    setTimeout(() => reject('Server did not respond in time.'), 10_000);

    const response = await fetch('/api/v1/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        ip,
        sshPort: parseInt(sshPort, 10),
        vncPort: parseInt(vncPort, 10)
      })
    });

    console.log(await response.json())

    if (!response.ok)
      reject('Server responded with an error.');
    resolve();
  });
}

async function checkSSHServer(ip: string, port: string) {

}
async function checkVNCServer(ip: string, port: string) {
  
}
