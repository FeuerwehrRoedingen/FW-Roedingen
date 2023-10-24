import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"

import Navitem from "./navitem"
import UserIcon from "./userIcon"

type IProps = {

}
export default function(props: IProps) {

  return (
    <Navbar isBlurred isBordered className="bg-gray-900 text-silver">
      <NavbarBrand>
        <h1>FWR Internal</h1>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Navitem href="/home" label="Home" />
        <Navitem href="/calendar" label="Calendar" />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <UserIcon />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
