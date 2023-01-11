import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import AppBar from '../components/AppBar';

const Groups = () => {
  return (
    <View style={styles.containerInitial}>
        <AppBar ez={'EZ '} split={'Split'} />

        <SafeAreaView style={styles.container}>
          <Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Groups</Text>
        </SafeAreaView>

      </View>
  )
}

export default Groups

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
