import React from "react"
import { StyleSheet, View } from "react-native"
import { StatusBar } from 'expo-status-bar';

import { LoginButton } from '../components/authButton';
import type { SecuredComponentProps } from "../router";

type ILoginPageProps = SecuredComponentProps & {

}
export function LoginPage(props: ILoginPageProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LoginButton returnTo="/home"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});