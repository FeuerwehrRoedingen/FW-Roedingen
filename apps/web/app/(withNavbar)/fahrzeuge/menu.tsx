"use client"

import { Button, Checkbox, CheckboxGroup, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

import { useMenu } from './menuContext'

type IProps = {

}
export default function(props: IProps){

  const { showMenu, showStats, setShowMenu, setShowStats } = useMenu();

  return (
    <Modal 
      isOpen={showMenu} 
      onOpenChange={() => setShowMenu(false)}
      isDismissable
      isKeyboardDismissDisabled
      hideCloseButton
    >
      <ModalContent className='bg-gray-950 text-silver'>
        <ModalHeader>Menu</ModalHeader>
        <ModalBody>
          <CheckboxGroup>
            <Checkbox value='fps' isSelected={showStats} onValueChange={setShowStats}>FPS anzeigen</Checkbox>
          </CheckboxGroup>
        </ModalBody>
        <ModalFooter>
          <Button 
            as={Link}
            href='/'
            color='danger'
            variant='shadow'
          >
            Beenden
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
