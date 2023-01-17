import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function Expenses(props) {
  const group = props.group;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.heading}>{group.title}</Text>
      </ScrollView>

      <Button 
					title="Add Expense"
					titleStyle={{
						fontFamily: 'Montserrat', 
						fontSize: 16, 
						color: '#D3D3D3'
					}}
					buttonStyle={{
						marginTop: 30,
						alignSelf: 'flex-end',
						borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 15,
						bottom: 25,
						right: 25,
						backgroundColor: '#332940'
					}}
					onPress={() => {navigation.navigate("AddExpense", {group: group})}}
				/>
    </View>
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
    marginTop: '3%'
  }
});