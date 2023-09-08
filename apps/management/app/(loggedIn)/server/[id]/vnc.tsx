"use client"
import React from 'react'
import { VncScreen, VncScreenHandle } from 'react-vnc'
import { Input } from "@nextui-org/input"
import { Spacer } from "@nextui-org/spacer"
import { Button } from "@nextui-org/react"

import { LoadingIcon } from '@/utils/loadingIcon'

type Props = {
  id: string;
}

export default function Vnc(props: Props) {
  const vncRef = React.useRef<VncScreenHandle>(null);
  const [wsUrl, setWsUrl] = React.useState<string | null>(null);
  const [credentials, setCredentials] = React.useState<{username: string, password: string} | null>(null);

  React.useEffect(() => {
    try{
      const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
      const host = process.env.NODE_ENV === 'production' ? `${window.location.host}` : '127.0.0.1:3001'
  
      fetch(`/api/v1/vnc/${props.id}`, {method: 'POST'})
        .then(data => {
          setWsUrl(`${protocol}://${host}/vnc?id=${props.id}`)
        })
        .catch(err => {
          console.error('Error starting VNC server',err);
        });
    }
    catch(err){
      console.error('Error starting VNC server',err);
    }
  }, []);

  function CredentialInput() {
    const userRef = React.createRef<HTMLInputElement>();
    const passRef = React.createRef<HTMLInputElement>();

    return (
      <div 
        className='h-[50vh] w-[50vw] flex flex-col items-center justify-center'
      >
        <Input 
          labelPlacement='outside'  
          label='Username'
          required
          name='username'
          ref={userRef}
        />
        <Spacer y={10}/>
        <Input
          labelPlacement='outside'
          label='Password'
          required
          name='password'
          type='password'
          ref={passRef}
        />
        <Spacer y={10}/>
        <Button
          type='submit'
          color='primary'
          variant='flat'
          onClick={() => {
            setCredentials({
              username: userRef.current?.value || '',
              password: passRef.current?.value || '',
            })
          }}
        >
          Connect via VNC
        </Button>
      </div>
    )
  }
  function VNC(){
    if(!wsUrl) {
      return (
        <LoadingIcon fullscreen />
      )
    }
    return (
      <VncScreen
        className='h-[90vh] w-screen py-2'
        ref={vncRef}
        url={wsUrl}
        scaleViewport
        debug={process.env.NODE_ENV === 'development'}
        loadingUI={<LoadingIcon fullscreen/>}
        onBell={() => {}}
        onCapabilities={e => {}}
        onClipboard={e => {}}
        onConnect={rfb => {}}
        onCredentialsRequired={(rfb) => {
          if(!rfb) 
            return;
          rfb.sendCredentials(credentials)
        }}
        onDesktopName={e => {}}
        onDisconnect={rfb => {
          console.log(rfb);
        }}
        onSecurityFailure={e => console.error(e?.detail)}
      />
    )
  }

  return (
    <div className='h-fit w-screen flex items-center justify-center'>
      {credentials ? <VNC /> : <CredentialInput />}
    </div>
  )
}
