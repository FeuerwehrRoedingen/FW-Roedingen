import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { IoIosPeople } from 'react-icons/io';
import { GrGamepad } from 'react-icons/gr';

import NavItem from './navItem';
import UserComponent from './userComponent';

type IProps = {

}
export default function Header(props: IProps){

  return(
    <div className="flex flex-col w-screen h-[15svh] sticky top-0 left-0 bg-gray-950 text-2xl">
      <div className='flex flex-row h-[10svh] min-h-[50px] w-screen'>
        <nav className="flex flex-row items-center justify-evenly h-full w-5/6">
          <NavItem to="/"          title='Home'   exact><IoHomeOutline/></NavItem>
          <NavItem to="/about"     title='Das sind wir'><IoIosPeople/></NavItem>
          <NavItem to="/fahrzeuge" title='Fahrzeuge' short='FZ'/>
          <NavItem to ="/games"    title="Spiele"><GrGamepad/></NavItem>  
          <NavItem to="/jf"        title='Jugendfeuerwehr' short='JF'/>
        </nav>    
        <div className='w-1/6 h-full py-4'>
          <div className='flex items-center justify-center border-l border-l-silver h-full w-full'>
            <UserComponent />
          </div>
        </div>
      </div>
      <div className='w-screen h-[5svh] bg-ral-3001'>
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
