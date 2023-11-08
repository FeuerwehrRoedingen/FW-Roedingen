import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"

import Navitem from "./navitem"
import UserIcon from "./userIcon"
import AdminMenu from "./adminMenu"

type IProps = {

}
export default function (props: IProps) {

  return (
    <Navbar isBlurred className="bg-gray-900 text-silver" maxWidth="2xl">
      <NavbarBrand>
        <h1 className="text-2xl font-semibold">FWR Internal</h1>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Navitem href="/home" label="Home" />
        <Navitem href="/chat" label="Chat" />
        <Navitem href="/calendar" label="Calendar" />
        <Navitem href="/borrow" label="Leihgaben" />
        <AdminMenu />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <UserIcon />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
