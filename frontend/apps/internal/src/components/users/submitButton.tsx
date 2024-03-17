"use client"
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export default function () {

  const { pending } = useFormStatus();

  return (
    <Button variant="ghost" color="warning" type='submit' isLoading={pending}>
      <p>Hinzufügen</p>
    </Button>
  )
}