"use client"
import React from "react"
import { Input } from '@nextui-org/input'
import { Button } from "@nextui-org/button";
import {Modal as _Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal"
import { Spacer } from "@nextui-org/spacer";
import { useSelector } from "react-redux";

import { AppState, useAppDispatch } from "@/store";
import { setSelectedServer, updateServer } from "@/store/reducer";
import type { Server } from "@/utils/Server";

export function Modal(){

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {servers, selectedServerID} = useSelector((state: AppState) => state.serversState);
  const dispatch = useAppDispatch();

  const nameRef = React.useRef<HTMLInputElement>(null);
  const ipRef = React.useRef<HTMLInputElement>(null);
  const sshPortRef = React.useRef<HTMLInputElement>(null);
  const vncPortRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (selectedServerID !== null) {
      onOpen();
    }
  }, [selectedServerID]);

  const server = servers[selectedServerID ?? 0] ?? null;

  function close() {
    dispatch(setSelectedServer(undefined));
  }

  function _updateServer(onClose: () => void) {
    let newServer: Partial<Omit<Server, 'id'>> = {}

    if(nameRef.current?.value && nameRef.current?.value !== server.name)
      newServer.name = nameRef.current?.value;
    if(ipRef.current?.value && ipRef.current?.value !== server.ip)
      newServer.ip = ipRef.current?.value;
    if(sshPortRef.current?.value && sshPortRef.current?.value !== server.sshPort.toString())
      newServer.sshPort = parseInt(sshPortRef.current?.value);
    if(vncPortRef.current?.value && vncPortRef.current?.value !== server.vncPort.toString())
      newServer.vncPort = parseInt(vncPortRef.current?.value);
    
    if(Object.keys(newServer).length === 0){
      onClose();
      return;
    }

    dispatch(updateServer({id: server.id, server: newServer}));
    onClose();
  }

  return (
    <_Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    onClose={close}
    hideCloseButton
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Edit {server.name}</ModalHeader>
          <ModalBody>
            <form>
              <Input ref={nameRef} label='Name' placeholder={server.name}/>
              <Spacer y={1} />
              <Input ref={ipRef} label='IP' placeholder={server.ip}/>
              <Spacer y={1} />
              <Input ref={sshPortRef} label='SSH Port' placeholder={server.sshPort.toString()} type='number'/>
              <Spacer y={1} />
              <Input ref={vncPortRef} label='VNC Port' placeholder={server.vncPort.toString()} type='number'/>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={() => _updateServer(onClose)}>Update</Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </_Modal>
  )
}