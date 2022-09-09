//Libraries
import React, { Component, useState } from 'react';
import { TbFiretruck } from 'react-icons/tb';
import { IoHomeOutline } from 'react-icons/io5';
import { GiFireAxe, GiFireShield } from 'react-icons/gi';
import { RiAdminLine } from 'react-icons/ri';
import { IoIosPeople } from 'react-icons/io';
import { isBrowser } from 'react-device-detect';
import { InferProps } from 'prop-types';
import type  { IconType } from 'react-icons';
import { NextRouter, useRouter, withRouter } from 'next/router';
import Link from 'next/link';
//Files
import LoginForm from './LoginForm';

type Props = {
  router: NextRouter;
}
type State = {
  showLogin: boolean;
}

class Header extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      showLogin: false
    }
  }

  openInternal = () => {
    this.props.router.push('/admin')
  }

  render() {
    const navbar =
      <nav className="navbar">
        <NavItem to="/home"           title='Home' icon={IoHomeOutline} exact/>
        <NavItem to="/uebungsdienst"  title='Übungsdienst' icon={GiFireAxe}/>
        <NavItem to="/einsaetze"      title='Einsätze' icon={GiFireShield} />
        <NavItem to="/fahrzeuge"      title='Fahrzeuge' icon={TbFiretruck}/>
        <NavItem to="/about"          title='Das sind wir' icon={IoIosPeople} />
        {isBrowser && <NavItem to='/admin/login' title='Login'/>}
      </nav>


    return (
      <div className="container">
        {navbar}
        <div className='bg-ral-3000 z-[-1] '>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="5vh">
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
}
export default withRouter(Header);

type ItemProps = {
  exact: boolean;
  icon: IconType;
  to: string;
  title: string;
}
function NavItem(props: InferProps<ItemProps>){
  const {pathname} = useRouter();
  const isActive = props.exact ? pathname === props.to : pathname.startsWith(props.to);
  return (
    <div className={ isActive ? "navItemActive": "navItem"}>
      <Link href={props.to}>
        {isBrowser ? props.title: <props.icon color={isActive ? 'bb1e10':'c0c0c0'}/>}
      </Link>
    </div>
  )
}
