import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { ListItem, Divider } from '@rneui/themed';
import { onCapture } from './Balances';

export default function Export(props) {
  const group = props.group;

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={styles.heading}>{group.title}</Text>
        <Divider width={2.5} color='#332940' />
        <ListItem
          containerStyle={{
            backgroundColor: '#121212',
            borderBottomWidth: 2,
            borderBottomColor: '#332940',
          }}
          onPress={() => onCapture(this.captureBalances)}
        >
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontFamily: 'Montserrat',
                fontSize: 16,
                color: '#D3D3D3',
                padding: 8,
                marginLeft: '5%'
              }}
            >
              PNG
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          containerStyle={{
            backgroundColor: '#121212',
            borderBottomWidth: 2,
            borderBottomColor: '#332940',
          }}
          onPress={() => {
            console.log('CSV')             
          }}
        >
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontFamily: 'Montserrat',
                fontSize: 16,
                color: '#D3D3D3',
                padding: 8,
                marginLeft: '5%'
              }}
            >
              CSV
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '3%'
  },
});