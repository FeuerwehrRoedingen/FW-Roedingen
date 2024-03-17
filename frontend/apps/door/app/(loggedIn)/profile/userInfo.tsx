"use client"
import { Avatar, Input, Spacer, Spinner } from "@nextui-org/react"

import useUser from "hooks/useUser"
import FileInput from "components/fileInput"

export default function () {
  const { user, isLoading } = useUser();

  if (isLoading)
    return <Spinner size="lg" color="danger" />

  if (!user)
    return null;

  return (
    <div className="w-96 h-fit p-8 flex flex-col justify-center items-center">
      <FileInput value={user.picture!} size={40}/>
      <Spacer y={2} />
      <Input variant="bordered" isRequired label="Vorname" value={user.name!} />
      <Spacer y={2} />
      <Input variant="bordered" isRequired label="Nachname" value={user.name!} />
      <Spacer y={2} />
      <Input variant="bordered" isRequired label="E-Mail" type="email" value={user.email!} />
      <Spacer y={2} />
      <Input variant="bordered" isRequired label="Username" value={user.nickname!} />
      <Spacer y={2} />
      <Input variant="bordered" isDisabled label="user id" value={user.sub!} />
      <Spacer y={2} />

    </div>
  )
} 