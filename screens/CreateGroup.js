import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import AppBar from '../components/AppBar';

export class CreateGroup extends Component {
  render() {
    return (
      <View style={styles.containerInitial}>
        <AppBar ez={'EZ '} split={'Split'} />

        <SafeAreaView style={styles.container}>
          <Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>CreateGroup</Text>
        </SafeAreaView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerInitial: {
    flex: 1,
    backgroundColor: '#121212'
  },
  container: {
    flex: 1,
    margin: '5%',
  }
});

export default CreateGroup