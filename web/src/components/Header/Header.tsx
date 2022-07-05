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

  openMenu = () => {
    this.setState({showMenu: true});
  }
  closeMenu = () => {
    this.setState({showMenu: false});
  }

  render() {
    const items = isBrowser ?
    <nav className="navbar">
      <NavItem to={routes.home()}           title='Home' icon={IoHomeOutline} exact/>
      <NavItem to={routes.uebungsdienst()}  title='Übungsdienst' icon={GiFireAxe}/>
      <NavItem to={routes.einsaetze()}      title='Einsätze' icon={GiFireShield} />
      <NavItem to={routes.fahrzeuge()}      title='Fahrzeuge' icon={TbFiretruck}/>
      <NavItem to={routes.about()}          title='Das sind wir' icon={IoIosPeople} />
      <img
        src="img/Logo.png"
        className="logo"
        onClick={() => navigate(routes.internal())}
      />
    </nav> :
    <nav className="navbarMobile">
      <IoMenuSharp onClick={this.openMenu} className="" size='40px'/>
      <div className="">
        <img src="img/Logo.png"/>
      </div>
    </nav>;


    return (
      <nav className="container">
        <div className="line"/>
          {items}
        <div className="line"/>
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
      {props.title}
      <props.icon style={{marginLeft: '5px'}} size='30px'/>
    </div>
  )
}
