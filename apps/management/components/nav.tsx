"use client"
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { usePathname } from "next/navigation"
import type { Session } from 'next-auth'
import { useSession, signOut, signIn } from "next-auth/react"

import { icons } from "./icons"

type IProps = {

}

export function Nav(props: IProps) {

  const pathname = usePathname();
  const { data: session } = useSession();

  const userContent = session ? UserContent(session) : SignInButton();

  return (
    <Navbar
      isBordered
    >
      <NavbarBrand>
        <Image src='/favicon.ico' height={50}/>
        <h1>Management</h1>
      </NavbarBrand>
      <NavbarContent
      >
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger
            >
              Servers
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Servers"
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
            >
              Autoscaling
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Link href='/settings'>
          Settings
        </Link>
      </NavbarContent>
      {userContent}
    </Navbar>
  )
}

function UserContent(data: Session) {

  const handleAction = (item: string|number) => {
    if (item === 'logout') {
      signOut()
    }
  }

  return (
    <NavbarContent>
      <Dropdown 
        placement="bottom"
      >
        <NavbarItem>
          <DropdownTrigger>
            <Avatar
              as="button"
              color="secondary"
              size="md"
              src={data.user!.image!}
            />
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="User menu actions"
          color="secondary"
          onAction={handleAction}
        >
          <DropdownItem key="profile">
              <p>Signed in as</p>
              <p>{data.user!.name!.split('.').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
          </DropdownItem>
          <DropdownItem key="logout">
              Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  )
}

function SignInButton() {
  return (
    <NavbarContent>
      <NavbarItem as='button' onClick={() => signIn('auth0')}>
        Login
      </NavbarItem>
      <NavbarItem>
        <Button auto flat as={Link} href="#">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  )
}
