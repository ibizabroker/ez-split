import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import AppBar from '../components/AppBar';

export class CreateGroup extends Component {
  render() {
    return (
      <View style={styles.containerInitial}>
        <AppBar you={'EZ '} fluence={'Split'} />

        <SafeAreaView style={styles.container}>
          <Text>CreateGroup</Text>
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

export default CreateGroup