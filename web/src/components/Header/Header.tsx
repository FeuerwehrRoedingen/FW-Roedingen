//Libraries
import React, { Component } from 'react';
import { TbFiretruck } from 'react-icons/tb';
import { IoHomeOutline, IoMenuSharp } from 'react-icons/io5';
import { GiFireAxe, GiFireShield } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { isBrowser } from 'react-device-detect';
import { InferProps } from 'prop-types';
import type  { IconType } from 'react-icons';
import { navigate, routes, useLocation } from '@redwoodjs/router';
//Files

type Props = {}
type State = {
  showMenu: boolean;
}

export default class Header extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      showMenu: false
    }
  }

  openInternal = () => {
    //navigate(routes.internal());
  }

  render() {
    const navbar =
      <nav className="navbar">
        <NavItem to={routes.home()}           title='Home' icon={IoHomeOutline} exact/>
        <NavItem to={routes.uebungsdienst()}  title='Übungsdienst' icon={GiFireAxe}/>
        <NavItem to={routes.einsaetze()}      title='Einsätze' icon={GiFireShield} />
        <NavItem to={routes.fahrzeuge()}      title='Fahrzeuge' icon={TbFiretruck}/>
        <NavItem to={routes.about()}          title='Das sind wir' icon={IoIosPeople} />
        <img
          src="img/Logo.png"
          className="logo"
          onClick={this.openInternal}
        />
      </nav>


    return (
      <nav className="container">
        {navbar}
        <div className='bg-ral-3000 z-[-1] ' >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="45">
            <defs>
              <pattern id="pinstripeL" patternUnits="userSpaceOnUse" width="30" height="30" patternTransform="rotate(45)">
                <line x1="15" y1="30" x2="15" y2="0" stroke="#ff0" stroke-width="15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pinstripeL)" />
          </svg>
        </div>
      </nav>
    )
  }
}

type ItemProps = {
  exact: boolean;
  icon: IconType;
  to: string;
  title: string;
}
function NavItem(props: InferProps<ItemProps>){
  const location = useLocation();
  const isActive = props.exact ? location.pathname === props.to : location.pathname.startsWith(props.to);
  return (
    <div className={ isActive ? "navItemActive": "navItem"} onClick={()=>navigate(props.to)}>
      {isBrowser ? props.title: <props.icon/>}
    </div>
  )
}
