"use client"
import useUser from 'hooks/useUser'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Link, Spinner } from '@nextui-org/react'

export default function () {

  const { user, isLoading } = useUser();

  if (isLoading)
    return <Spinner size="lg" color="danger" />


  return (
    <Dropdown className='dark'>
      <DropdownTrigger>
        <Avatar
          src={user?.picture!}
          size="md"
          className='cursor-pointer'
        />
      </DropdownTrigger>
      <DropdownMenu disabledKeys={["username"]}>
        <DropdownSection showDivider title="Angemeldet als">
          <DropdownItem key="username">{user?.name}</DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem as={Link} href='/api/auth/logout' color="danger" className='text-silver'>
              Abmelden
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
