import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const navbar = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>navbar</Text>
    </View>
  )
}

export default navbar

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    height: '100%',
    width: '30%'
  }
})
