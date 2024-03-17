"use client"
import React from "react"
import { IoIosSettings } from "react-icons/io"
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Spacer } from "@nextui-org/react"
import { Id, toast } from "react-toastify";

import { start, pause } from "./events"

export default function () {

  const [from, setFrom] = React.useState(5_000);
  const [to, setTo] = React.useState(10_000);
  const [open, setOpen] = React.useState(false);

  let pauseID: Id | undefined;
  let startID: Id | undefined;
  let started: boolean = false;

  const handleStart = () => {
    if (started)
      return;
    started = true;

    if (pauseID)
      toast.dismiss(pauseID);

    start(from, to);
    startID = toast.info("Das Spiel wurde gestartet!");
  }
  const handlePause = () => {
    if (!started)
      return;
    started = false;

    if (startID)
      toast.dismiss(startID);

    pause();
    pauseID = toast.info("Das Spiel wurde pausiert!", { autoClose: false, hideProgressBar: true });
  }

  return (
    <div className="w-fit h-20 bg-gray-900 rounded-3xl">
      <div className="w-full h-full flex flex-row items-center justify-evenly gap-4 px-4">
        <Button isIconOnly className='bg-transparent' onClick={() => setOpen(true)}>
          <IoIosSettings size={40} />
        </Button>
        <Button variant='ghost' color='success' onClick={handleStart}>
          <p className="text-2xl">Start</p>
        </Button>
        <Button variant='ghost' color='danger' onClick={handlePause} className='data-[hover]:bg-gray-900'>
          <p className="text-2xl">Pause</p>
        </Button>
      </div>
      <Modal
        isOpen={open}
        onOpenChange={() => setOpen(false)}
        backdrop='blur'
        size='4xl'
      >
        <ModalContent className='bg-gray-900'>
          <ModalHeader>
            <h1 className='text-silver'>Einstellungen</h1>
          </ModalHeader>
          <ModalBody>

          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
