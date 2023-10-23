"use client"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Spinner } from "@nextui-org/react"

import useUser from "hooks/useUser"

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
          src={user?.picture!} 
          size="md"
          className="cursor-pointer"
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
        <DropdownSection>
          <DropdownItem key="logout" color="danger" variant="flat">Logout</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
