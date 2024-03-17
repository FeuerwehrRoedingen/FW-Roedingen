"use client"
import { Button, Card, CardBody, CardHeader, Divider, Modal } from '@nextui-org/react'
import { useUserContext } from 'components/users/context'

export default function () {

  const { selectUser, setShowModal } = useUserContext();

  function showModal(){
    selectUser(undefined);
    setShowModal(true);
  }

  return (
    <Card className='bg-gray-900'>
      <CardHeader title="Add User">
        Benutzer hinzufügen
      </CardHeader>
      <Divider />
      <CardBody>
        <Button color="danger" onClick={showModal}>
          <p className='text-gray-900'>Hinzufügen</p>
        </Button>
      </CardBody>
    </Card>
  )
}
