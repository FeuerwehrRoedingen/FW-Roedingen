"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React, { useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoIosChatbubbles } from 'react-icons/io'
import { VscHome, VscSettingsGear } from 'react-icons/vsc'
import { FaServer } from 'react-icons/fa'

type Props = {}

function menuBar(props: Props) {
  const logout = () => {
    console.log('logging out')
    fetch('https://api.feuerwehr-roedingen.de/logout', {
      method: 'DELETE'
    })
    signOut();
  }

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false)

  return (
    <nav>
      <NavItem to='/home' icon={VscHome} exact />
      <NavItem to='/chat' icon={IoIosChatbubbles} />
      <NavItem to='/settings' icon={VscSettingsGear} />
      <NavItem to='/server' icon={FaServer} />
      <NavLogo to='/groupAlarm' img='/img/groupalarm.png' activeImg='/img/groupalarm_cyan.png' classname='gaLogo' />
      <NavLogo to='/pocketbase' img='/img/pocketbase.png' activeImg='/img/pocketbase_cyan.png' classname='pbLogo' />
      <NavLogo to='/portainer' img='/img/portainer.png' activeImg='/img/portainer_cyan.png' classname='ptLogo' />
      <div className='userLogo' ref={ref} onClick={logout}>
        <HiOutlineUserCircle size='full' />
      </div>
    </nav>
  )
}

export default menuBar;

type ItemProps = {
  icon: IconType;
  exact?: boolean;
  to: string;
}
function NavItem(props: ItemProps) {
  const pathname = usePathname();
  const isActive = props.exact ? pathname === props.to : pathname?.startsWith(props.to);

  return (
    <div className={isActive ? 'navItem' : 'navItemActive'}>
      <Link href={props.to}>
        <props.icon color={isActive ? '5ac8ff' : 'white'} size='full'></props.icon>
      </Link>
    </div>
  )
}

type LogoProps = {
  to: string;
  img: string;
  activeImg: string;
  exact?: boolean;
  classname?: string;
}
function NavLogo(props: LogoProps) {
  const pathname = usePathname();
  const isActive = props.exact ? pathname === props.to : pathname?.startsWith(props.to);

  return (
    <Link href={props.to}>
      <img src={isActive ? props.activeImg : props.img} className={props.classname} />
    </Link>
  )
}