"use client"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Spinner } from "@nextui-org/react"

import useUser from "hooks/useUser"
import { proxy } from "utils/handler/handleProxy"

type IProps = {

}
export default function(props: IProps) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Spinner size="lg" color="danger"/>
    )
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar 
          src={proxy(user?.picture!)} 
          className="cursor-pointer w-12 h-12"
        />
      </DropdownTrigger>
      <DropdownMenu 
        disabledKeys={["user"]}
        onAction={(key) => {
          if (key === "logout") {
            window.location.href = "/api/auth/logout";
          }
        }}
      >
        <DropdownSection showDivider title="Angemeldet als">
          <DropdownItem key="user">{user?.name}</DropdownItem>
        </DropdownSection>
        <DropdownItem key="logout" color="danger" variant="flat">Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
