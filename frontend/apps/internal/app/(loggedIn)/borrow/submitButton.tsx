"use client"
import { useFormStatus } from "react-dom"
import { Button } from "@nextui-org/react"

export default function(){

  const { pending, method, action, data } = useFormStatus()

  return (
    <Button
        variant="ghost"
        color="danger"
        size='lg'
        className='max-w-xs'
      >
        Überprüfen
      </Button>
  )
}
