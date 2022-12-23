import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import AppBar from '../components/AppBar';

export class Home extends Component {
  render() {
    return (
      <View style={styles.containerInitial}>
        <AppBar you={'Ez'} fluence={'Split'} />

        <SafeAreaView style={styles.container}>
          <Text>Home</Text>
        </SafeAreaView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerInitial: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    margin: '5%',
  }
});

export default Home