import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import AppBar from '../components/AppBar';

export class Groups extends Component {
  render() {
    return (
      <View style={styles.containerInitial}>
        <AppBar ez={'EZ '} split={'Split'} />

        <SafeAreaView style={styles.container}>
          <Text>Groups</Text>
        </SafeAreaView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerInitial: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    margin: '5%',
  }
});

export default Groups