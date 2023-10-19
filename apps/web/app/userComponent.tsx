"use client"
import { Avatar } from '@nextui-org/avatar'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'

import useUser from "hooks/useUser"

type IProps = {

}
export default function(props: IProps){

  const { user, isLoading } = useUser();

  if(isLoading) {
    return (
      <h1>Loading... </h1>
    )
  }

  if(user){
    return (
      <div className='flex flex-row w-full items-center justify-center gap-3'>
        <Dropdown className='dark text-silver'>
          <DropdownTrigger>
            <Avatar src={user.picture!} alt={user.name!} size="lg" className='cursor-pointer'/>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title="logged in as" showDivider>
              <DropdownItem key="profile">{user.name}</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  } else {
    return (
      <a className="border border-silver px-8 py-4 rounded-2xl text-silver" href="/api/auth/login">
        Login
      </a>
    )
  }
}
