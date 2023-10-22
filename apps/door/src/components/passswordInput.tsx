"use client"
import React from "react"
import { Input } from "@nextui-org/input"
import { EyeFilledIcon, EyeSlashFilledIcon } from "./icons"
import { Spacer } from "@nextui-org/spacer"

type IProps = {
  variant?: 'flat' | 'bordered' | 'underlined' | 'faded';
}

export default function (props: IProps) {

  return (
    <div className="h-fit w-full flex flex-row">
      <PasswordInput label="Passwort" name="password" variant={props.variant} />
      <Spacer x={4} />
      <PasswordInput label="Passwort wiederholen" name="password2" variant={props.variant} />
    </div>
  )
  
}

type IPasswordInputProps = {
  label?: string;
  name?: string;
  variant?: 'flat' | 'bordered' | 'underlined' | 'faded';
}
export function PasswordInput(props: IPasswordInputProps) {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const endContent = (
    <button onClick={togglePasswordVisibility} type="button">
      {passwordVisible ? 
        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />:
        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
      }
    </button>
  )

  return (
    <Input
      type={passwordVisible ? 'text' : 'password'}
      label={props.label}
      name={props.name}
      endContent={endContent}
      variant={props.variant}
      isRequired
    />
  )
}
