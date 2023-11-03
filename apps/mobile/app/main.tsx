import React from 'react'
import { Text, View } from 'react-native';
import { NativeRouter } from 'react-router-native'
import { useAuth0 } from 'react-native-auth0';

import routes from './routes';
import Login from './pages/login';
import { useNotifications } from './notifications';
import Navbar from './components/navbar';
import { StyledSafeAreaView, StyledText, StyledView } from './components/styled';


export default function Main() {

  const { isLoading, user, error } = useAuth0();
  const {} = useNotifications();

  let component;

  if(isLoading){
    component = (
      <StyledText className='text-center text-2xl text-silver'>
        Loading...
      </StyledText>
    )
  }
  else if(error){
    //TODO handle error with sentry
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
    <StyledSafeAreaView className='w-screen h-screen flex flex-col bg-gray-950 text-silver'>
      {component}
    </StyledSafeAreaView>
  )
}