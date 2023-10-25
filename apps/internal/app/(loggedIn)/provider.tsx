"use client"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Provider as ReduxProvider } from "react-redux"

import { store } from "store"

type IProps = {
  children: React.ReactNode;
}
export default function(props: IProps){
  return (
    <UserProvider>
      <ReduxProvider store={store}>
        {props.children}
      </ReduxProvider>
    </UserProvider>
  )
}
