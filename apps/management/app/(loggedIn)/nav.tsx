"use client"
import * as React from "react"
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useUser, type UserProfile } from '@auth0/nextjs-auth0/client'

import type { Server } from '@/utils/Server'

type IProps = {}

export function Nav(props: IProps) {

  const { push } = useRouter();
  const pathname = usePathname();
  const [servers, setServers] = React.useState<Server[]>([]);
  const { user } = useUser();

  React.useEffect(() => {
    fetch('/api/v1/servers')
      .then((res) => res.json())
      .then((data) => setServers(data))
  }, []);


  const handleAction = (item: string|number) => {
    push(`/server/${item}`);
  }

  const userContent = user ? UserContent(user) : SignInButton();
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
        <NavbarItem isActive={pathname==='/dashboard'}>
          <Link href="/dashboard" color={pathname==='/dashboard'?'primary':'foreground'}>
            Dashboard
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem className='cursor-pointer'>
            <Link color='foreground'>
              <DropdownTrigger>
                Servers
              </DropdownTrigger>
            </Link>
          </NavbarItem>
          <DropdownMenu
            aria-label="Servers"
            onAction={handleAction}
          >
            {serverContent}
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive={pathname==='/settings'} >
          <Link href='/settings' color={pathname==='/settings'?'primary':'foreground'}>
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent >
      {userContent}
    </Navbar>
  )
}

function UserContent(user: UserProfile) {

  const handleAction = (item: string|number) => {
    if (item === 'logout') {
      redirect('/api/auth/logout');
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
              src={user.picture!}
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
              <p>{(user!.name || '').split('.').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
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
      <NavbarItem as='button'>
        <Link href="/api/auth/login">
          Login
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} href="#">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  )
}
