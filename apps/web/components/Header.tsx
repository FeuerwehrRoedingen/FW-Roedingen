"use client"

//Libraries
import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { IoIosPeople } from 'react-icons/io';
import { isBrowser } from 'react-device-detect';
import { InferProps } from 'prop-types';
import type  { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import "./components.css"

export function Header(){

  return(
    <div className="container">
      <nav className="navbar">
        <NavItem to="/"          title='Home'            icon={IoHomeOutline} exact/>
        <NavItem to="/about"     title='Das sind wir'    icon={IoIosPeople} />
        <NavItem to="/jf"        title='Jugendfeuerwehr'/>
      </nav>
      <div className='header_inner'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100vw" height="5vh">
          <defs>
            <pattern id="pinstripeL" patternUnits="userSpaceOnUse" width="30" height="30" patternTransform="rotate(45)">
              <line x1="15" y1="30" x2="15" y2="0" stroke="#ff0" strokeWidth="15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pinstripeL)" />
        </svg>
      </div>
    </div>
  )
}

type ItemProps = {
  exact: boolean;
  icon: IconType;
  to: string;
  title: string;
}
function NavItem(props: InferProps<ItemProps>){
  const pathname = usePathname();
  const isActive = props.exact ? pathname === props.to : pathname.startsWith(props.to);
  return (
    <div className={ isActive ? "navItemActive": "navItem"}>
      <Link href={props.to}>
        {isBrowser ? props.title: <props.icon color={isActive ? 'bb1e10':'c0c0c0'}/>}
      </Link>
    </div>
  )
}
