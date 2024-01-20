"use client"

import React from "react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, NavbarItem } from "@nextui-org/react"
import { usePathname } from "next/navigation"
import { IoChevronDown } from "react-icons/io5"

export default function () {

  const isActive = usePathname().startsWith("/admin");

  return (
    <Dropdown aria-label="admin Menu">
      <NavbarItem>
        <DropdownTrigger>
          <Link
            className="cursor-pointer"
            color={isActive ? "danger": "foreground"}
            size="lg"
          >
            <IoChevronDown />
            Admin
          </Link>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="admin Menu" >
        <DropdownItem href="/admin/users" textValue="users">
          <h1 className="text-silver text-lg">Users</h1>
        </DropdownItem>
        <DropdownItem href="/admin/logs" textValue="logs">
          <h1 className="text-silver text-lg">Logs</h1>
        </DropdownItem>
        <DropdownItem href="/admin/borrow" textValue="leihgaben">
          <h1 className="text-silver text-lg">Leihgaben</h1>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
