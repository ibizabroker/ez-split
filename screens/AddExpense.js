import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppBarWithBack from '../components/AppBarWithBack';
import { useNavigation } from '@react-navigation/native';

export default function AddExpense({ route, navigation }) {
  navigation = useNavigation();
  const { group } = route.params;

  return (
    <View style={styles.container}>
      <AppBarWithBack ez={'EZ '} split={'Split'} />
      <Text style={{color: '#fff'}}>{group.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
});