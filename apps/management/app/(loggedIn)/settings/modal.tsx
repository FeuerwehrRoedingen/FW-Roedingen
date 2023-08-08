"use client"
import React from "react"
import { Input } from '@nextui-org/input'
import {Modal as _Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal"
import { useSelector } from "react-redux";

import { AppState, useAppDispatch } from "@/store";
import { setSelectedServer } from "@/store/reducer";
import { Server } from "@/utils/Server";

export function Modal(){

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const selectedServerID = useSelector((state: AppState) => state.serversState.selectedServerID);
  const servers = useSelector((state: AppState) => state.serversState.servers);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (selectedServerID !== null) {
      onOpen();
    }
  }, [selectedServerID]);

  const server = servers[selectedServerID ?? 0] ?? null;

  function close() {
    dispatch(setSelectedServer(undefined));
  }

  function updateServer(server: Server) {
    
  }

  return (
    <_Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    onClose={close}
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Edit {server.name}</ModalHeader>
          <ModalBody>
            <form>
              <Input label={`${server.name} Name`}     placeholder={server.name} />
              <Input label={`${server.name} IP`}       placeholder={server.ip} />
              <Input label={`${server.name} SSH Port`} placeholder={server.sshPort.toString()} type='number'/>
              <Input label={`${server.name} VNC Port`} placeholder={server.vncPort.toString()} type='number'/>
            </form>
          </ModalBody>
          <ModalFooter>
            <button onClick={onClose}>Close</button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </_Modal>
  )
}