"use client"
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useFormState } from 'react-dom'

import { useUserContext } from './context'
import { handleCreate, handleUpdate, FormState } from './actions'
import SubmitButton from './submitButton'


const initalState: FormState = {
  error: undefined,
  message: 'pending'
}

export default function () {
  const {
    selectedUser,
    showModal,

    setShowModal
  } = useUserContext();

  const title = selectedUser ? 'Benutzer Bearbeiten' : 'Benutzer Hinzufügen';
  const [state, handler] = useFormState<FormState, FormData>(selectedUser ? handleUpdate : handleCreate, initalState);

  if(state.message === 'success') 
    setShowModal(false);

  else if(state.error)
    console.error(state.error);

  //TODO add error handling
  //TODO passing undefined as input value causes error (Component changed from uncontrolled to controlled)

  return (
    <Modal
      isOpen={showModal}
      onOpenChange={() => setShowModal(!showModal)}
      backdrop='blur'
      className='bg-gray-900 text-silver'
      size='4xl'
    >
      <ModalContent>
        <ModalHeader> {title} </ModalHeader>
        <Divider />
        <form action={handler}>
          <ModalBody>
            <div className='w-full h-fit flex flex-row gap-4'>
              <Input size="lg" variant="underlined" isRequired label="Vorname"  type="text" name="given_name" value={selectedUser?.nickname!} />
              <Input size="lg" variant="underlined" isRequired label="Nachname" type="text" name="family_name" value={selectedUser?.name!} />
            </div>
            <Input size="lg" variant="underlined" isRequired label="E-Mail"   type="email"    name="email" value={selectedUser?.email!} />
            <Input size="lg" variant="underlined" isRequired label="Telefon"  type="phone"    name="phone_number"/>
            <Input size="lg" variant="underlined" isRequired label="Passwort" type="password" name="password" />
            <Input size="lg" variant="underlined" isRequired label="Passwort wiederholen" type="password" name="password_confirm" />
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" color="danger" onClick={() => setShowModal(false)}>
              <p>Abbrechen</p>
            </Button>
            <SubmitButton />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}