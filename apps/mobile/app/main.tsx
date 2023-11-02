import React from 'react'
import { Text, View } from 'react-native';
import { NativeRouter } from 'react-router-native'
import { useAuth0 } from 'react-native-auth0';

import routes from './routes';
import Login from './pages/login';


export default function Main() {

  const { isLoading, user, error } = useAuth0();

  if(isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )

  if(error)
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    )

  if(!user)
    return <Login />

  return (
    <NativeRouter>
      {routes}
    </NativeRouter>
  )
}