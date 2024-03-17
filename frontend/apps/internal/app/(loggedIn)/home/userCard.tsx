"use client"
import { Card, CardBody, CardFooter, CardHeader, Divider, Spinner } from "@nextui-org/react"
import useUser from "hooks/useUser"

export default function(){
  const { user, isLoading } = useUser()

  if(isLoading)
    return <Spinner color="danger"/>

  const today = new Date();

  return (
    <Card>
      <CardHeader>
        <h1 className="capitalize text-4xl p-4"> 
          Hallo {user?.name?.split('.')[0]} 
        </h1>
      </CardHeader>
      <Divider/>
      <CardBody>
        <h1 className="capitalize text-2xl p-4">
          {today.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h1>
      </CardBody>
    </Card>
  )
}
