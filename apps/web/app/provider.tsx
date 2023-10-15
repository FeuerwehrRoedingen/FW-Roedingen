"use client"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "store"

type IProps = {
  children: React.ReactNode
}
export const Provider = (props: IProps) => {
  return (
    <ReduxProvider store={store}>
      {props.children}
    </ReduxProvider>
  )
}