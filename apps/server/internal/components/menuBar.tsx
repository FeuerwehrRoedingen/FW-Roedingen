"use client";
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoIosChatbubbles } from 'react-icons/io'
import { VscHome, VscSettingsGear } from 'react-icons/vsc'
import { FaServer } from 'react-icons/fa'

type Props = {}

export default function menuBar(props: Props) {
  return (
    <nav>
      <NavItem to='/home' icon={VscHome} exact />
      <NavItem to='/chat' icon={IoIosChatbubbles} />
      <NavItem to='/settings' icon={VscSettingsGear} />
      <NavItem to='/server' icon={FaServer} />
      <NavLogo to='/groupAlarm' img='/img/groupalarm.png' activeImg='/img/groupalarm_cyan.png' classname='gaLogo' />
      <NavItem to='/profile' icon={HiOutlineUserCircle} className='userLogo'/>
    </nav>
  )
}

type ItemProps = {
  icon: IconType;
  exact?: boolean;
  to: string;
  className?: string;
}
function NavItem(props: ItemProps) {
  const pathname = usePathname();
  const isActive = props.exact ? pathname === props.to : pathname?.startsWith(props.to);

  return (
    <div className={props.className? props.className: isActive ? 'navItem' : 'navItemActive'}>
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