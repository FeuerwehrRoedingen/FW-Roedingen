import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';

import { LoginButton, LogoutButton } from './components/authButton';

export default function App() {
  return (
    <Auth0Provider domain='fw-roedingen.eu.auth0.com' clientId='Ib9x0oA1YB9N5lbcee33RCu9VMQIT45y'>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LoginButton/>
        <LogoutButton/>
      </View>
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
