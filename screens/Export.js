import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Export(props) {
  const group = props.group;

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={{color: '#fff'}}>Export</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});