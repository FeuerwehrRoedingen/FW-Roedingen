"use client"
import React from 'react'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'
import { Link } from '@nextui-org/link'
import { Progress } from '@nextui-org/progress'
import { Tooltip } from '@nextui-org/tooltip'
import dynamic from 'next/dynamic'

import useUser from "hooks/useUser"
import { ranks, RankStripes } from "components/rank"

const isDev = process.env.NODE_ENV === 'development';

const door = isDev ? 'http://localhost:3003' : 'https://door.feuerwehr-roedingen.de'

const LoadingIcon = dynamic(() => import('components/loadingIcon'));

type IProps = {

}
export default function(props: IProps){

  const { user, isLoading } = useUser();

  if(isLoading) {
    return (
      <LoadingIcon />
    )
  }

  if(user){
    //TODO get rank from user metadata 
    //TODO get points from user metadata
    const rank = ranks.Hauptbrandmeister;
    const points = 200;
    const needed = 1000;
    const progress = points / needed * 100;

    return (
      <div className='flex flex-row w-full items-center justify-center gap-3'>
        <Dropdown className='dark text-silver' backdrop='blur'>
          <DropdownTrigger>
            <Avatar src={user.picture!} alt={user.name!} size="lg" className='cursor-pointer'/>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='User Menu'
            onAction={handleAction}
          >
            <DropdownSection title="Angemeldet als" showDivider>
              <DropdownItem key="profile" variant="light">{user.name}</DropdownItem>
            </DropdownSection>
            <DropdownSection title="Level" showDivider>
              <DropdownItem key="level">{rank.name}</DropdownItem>  
              <DropdownItem key="points" variant="light" textValue='level progress'>
                <Tooltip content={`Du benötigst noch ${needed-points} Punkte`} placement='left' showArrow>
                  <Progress value={progress} label="Punkte bis zum nächsten Level" color="danger" size="sm"/>  
                </Tooltip>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Account">
              <DropdownItem key="settings">
                Einstellungen
              </DropdownItem>
              <DropdownItem key="profile">
                Profil
              </DropdownItem>
              <DropdownItem key="logout" color="danger" variant='shadow'>
                Abmelden
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <Tooltip content={`${rank.name} (${rank.short})`} placement="bottom-start">
          <a>
            <RankStripes rank={rank}/>
          </a>
        </Tooltip>
      </div>
    )
  } else {
    return (
      <div className='flex flex-row w-full items-center justify-center gap-3'>
        <Button as={Link} href="/api/auth/login" variant='ghost' color="danger">
          Login
        </Button>
        <Button as={Link} href={`${door}/signup`} variant='shadow' color="danger">
          Registrieren
        </Button>
      </div>
    )
  }
}

function handleAction(key: React.Key){
  if(key === 'settings'){
    window.open(`${door}/settings`, '_blank');
  }
  else if(key === 'profile'){
    window.open(`${door}/profile`, '_blank');
  }
  else if(key === 'logout'){
    window.open('/api/auth/logout', '_self');
  }
}
