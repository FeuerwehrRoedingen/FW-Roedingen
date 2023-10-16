"use client"
import { Provider as ReduxProvider } from "react-redux"
import { UserProvider } from "@auth0/nextjs-auth0/client"

import { store } from "store"

type IProps = {
  children: React.ReactNode
}
export const Provider = (props: IProps) => {
  return (
    <UserProvider>
      <ReduxProvider store={store}>
        {props.children}
      </ReduxProvider>
    </UserProvider>
  )
}
