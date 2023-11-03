import React from 'react'

import { StyledText, StyledView } from './styled'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Navbar() {
  return (
    <StyledView className='flex flex-row items-center justify-evenly bg-gray-900 w-screen h-[10%]'>
        <Icon name='home' size={30} color='silver'/>
      <StyledView >
      </StyledView>
    </StyledView>
  )
}
