import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'

import NavItem from './navItem'
import UserProfile from './userProfile'

export default function () {

  return (
    <Navbar isBordered isBlurred >
      <NavbarBrand>
        <h1 className='text-2xl'>FWR Door</h1>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <NavItem exact path='/home' title='Home' />
        </NavbarItem>
        <NavbarItem>
          <NavItem path='/settings' title="Einstellungen" />
        </NavbarItem>
        <NavbarItem>
          <NavItem path="/profile" title="Profil" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <UserProfile />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
