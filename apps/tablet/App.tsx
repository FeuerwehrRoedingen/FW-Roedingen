import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes} from 'react-router-native'

import Navbar from './src/components/Navbar'
import Home from './src/pages/Home'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        animated={true}
        hidden={false} 
      />
      <NativeRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
