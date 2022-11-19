import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {}

type State = {}

export default class Home extends Component<Props, State> {
  state = {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '70%'
  }
})