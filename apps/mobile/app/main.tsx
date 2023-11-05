import React from 'react'
import { ActivityIndicator } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { useAuth0 } from 'react-native-auth0'
import * as Sentry from '@sentry/react-native'

import routes from './routes'
import Login from './pages/login'
import Navbar from './components/navbar'
import { StyledText, StyledView } from './components/styled'


export default function Main() {

  const { isLoading, user, error } = useAuth0();

  let component;

  if(isLoading){
    component = (
      <ActivityIndicator size='large' color='#A72920' />
    )
  }
  else if(error){
    Sentry.captureException(error);
    component = (
      <StyledText className='text-center text-2xl text-ral-3000'>
        Error: {error.message}
      </StyledText>
    )
  }
  else if(!user) {
    component = (
      <Login />
    )
  }
  else {
    component = (
      <>
        <Navbar />
        <StyledView className='w-screen h-[90%]'>
          <NativeRouter>
            {routes}
          </NativeRouter>
        </StyledView>
      </>
    )
  }

  return (
    <StyledView className='w-screen h-screen flex flex-col items-center justify-center'>
      {component}
    </StyledView>
  )
}
