import { Text, View, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AppBarWithBack from '../components/AppBarWithBack';
import { Button, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from "react-native-responsive-fontsize";

export default function ExpenseDetails({ route }) {
  const { expense } = route.params;
  const { group } = route.params;
  const navigation = useNavigation();

  const [deleteKey, setDeleteKey] = useState('');
  const [deleteValue, setDeleteValue] = useState({});
	const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
		setVisible(!visible);
	};

  const removeJSON = async (key, value) => {
    try {
      const jsonArray = await AsyncStorage.getItem(key);
      let parsedArray = JSON.parse(jsonArray);
      parsedArray = parsedArray.filter(item => !(item.expenseTitle === value.expenseTitle));

      await AsyncStorage.setItem(key, JSON.stringify(parsedArray));
      toggleDialog();
      navigation.pop();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <AppBarWithBack ez={'EZ '} split={'Split'} />
      <Text style={styles.heading}>{expense.expenseTitle}</Text>
      <ScrollView>
        <Text style={styles.key}>
          Paid By:
          <Text style={styles.value}> {expense.paidBy}</Text>
        </Text>
        <Text style={styles.key}>
          Amount:
          <Text style={styles.value}> {group.currency}{expense.amount}</Text>
        </Text>
        <Text style={styles.key}>
          Date:
          <Text style={styles.value}> {expense.date}</Text>
        </Text>
        <Text style={styles.key}>
          Involved Members:
          {expense.participation.map((item, index) => (
            <Text key={index} style={styles.value}> {item}{index !== expense.participation.length - 1 ? ', ' : ''}</Text>
          ))}
        </Text>
      </ScrollView>
      <Button 
        title="Delete"
        titleStyle={{
          fontFamily: 'Montserrat', 
          fontSize: RFValue(14.5), 
          color: '#D3D3D3'
        }}
        buttonStyle={{
          alignSelf: 'center',
          borderRadius: 10,
          height: 45,
          width: '90%',
          backgroundColor: '#332940'
        }}
        containerStyle={{
          marginTop: '3%',
          bottom: '3%'
        }}
        onPress={() => {
          setDeleteKey(group.title);
          setDeleteValue(expense);
          toggleDialog();
        }}
      />
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
      >
        <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(16.5), marginBottom: 10, color: '#D3D3D3'}}>Delete?</Text>
				<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Are you sure you want to delete this expense?</Text>
        <Dialog.Actions>
          <Dialog.Button title="No, go back" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog()}/>
          <Dialog.Button title="Yes" titleStyle={{fontFamily: 'Montserrat-Medium', color: 'red'}} onPress={() => {removeJSON(deleteKey, deleteValue)}}/>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  heading: {
    fontFamily: 'Montserrat-Medium',
    fontSize: RFValue(18.5),
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '5%'
  },
  key: {
    fontFamily: 'Montserrat',
    fontSize: RFValue(14.5),
    color: '#D3D3D3',
    marginLeft: '5%',
    marginBottom: '3%'
  },
  value: {
    fontFamily: 'Montserrat',
    fontSize: RFValue(14.5),
    color: '#75559F',
    marginBottom: '3%'
  }
});