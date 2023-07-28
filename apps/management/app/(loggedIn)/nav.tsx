"use client"
import * as React from "react"
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { usePathname } from "next/navigation"
import type { Session } from 'next-auth'
import { useSession, signOut, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import type { Server } from './Server'

type IProps = {

}

export function Nav(props: IProps) {

  const { push } = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [servers, setServers] = React.useState<Server[]>([]);

  React.useEffect(() => {
    fetch('/api/v1/servers')
      .then((res) => res.json())
      .then((data) => setServers(data))
  }, []);

  const handleAction = (item: string|number) => {
    console.log(item);
    push(`/server/${item}`);
  }

  const userContent = session ? UserContent(session) : SignInButton();
  const serverContent = servers.map((server) => {
    return (
      <DropdownItem
        key={server.id}
        description={`ip:${server.ip} ssh:${server.sshPort} vnc:${server.vncPort}`}
      >
        {server.name}
      </DropdownItem>
    )
  });

  return (
    <Navbar
      isBordered
      isBlurred
      maxWidth="xl"
    >
      <NavbarBrand >
        <Image src='/favicon.ico' width={50} />
        <h1>Management</h1>
      </NavbarBrand>
      <NavbarContent
        className="hidden md:flex"
      >
        <NavbarItem 
          isActive={pathname==='/dashboard'} 
          as={Link} 
          href="/dashboard"
          color={pathname==='/dashboard' ? 'primary' : 'foreground'}
        >
          Dashboard
        </NavbarItem>
        <Dropdown>
          <NavbarItem className='cursor-pointer' as={Link} color='foreground'>
            <DropdownTrigger>
              Servers
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Servers"
            onAction={handleAction}
          >
            {serverContent}
          </DropdownMenu>
        </Dropdown>
        <NavbarItem 
          isActive={pathname==='/settings'} 
          as={Link} 
          href='/settings'
          color={pathname==='/settings' ? 'primary' : 'foreground'}
        >
          Settings
        </NavbarItem>
      </NavbarContent >
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
    <NavbarContent justify="end">
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
    <NavbarContent justify="end">
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
