"use client"
import { UserProvider } from "@auth0/nextjs-auth0/client"

type IProps = {
  children: React.ReactNode;
}
export default function(props: IProps){
  return (
    <UserProvider>
      {props.children}
    </UserProvider>
  )
}
