"use client"

import { useFormStatus } from "react-dom"

import { Button } from "@nextui-org/react"

type IProps = {
  text: string;
}
export default function(props: IProps){

  const { pending } = useFormStatus();
  
  return (
    <Button 
      variant="ghost"
      color="warning"
      isLoading={pending}
      type="submit"
    >
      {props.text}
    </Button>
  )
}
