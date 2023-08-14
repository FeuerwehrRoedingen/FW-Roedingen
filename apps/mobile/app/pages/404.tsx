import { StyleSheet, Text, View } from 'react-native'

export function NotFoundPage(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>404 | Not found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 50,
  }
});