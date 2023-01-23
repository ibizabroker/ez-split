import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

export default function Balances(props) {
  const group = props.group;
  const fetchData = props.fetchData;
  const totalGroupExpense = props.totalGroupExpense;
  const expensesPerPerson = props.expensesPerPerson;
  const balances = props.balances;
  const expensesPerPersonTotal = props.expensesPerPersonTotal;

  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused) {
      fetchData();
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.heading}>{group.title}</Text>
        <Text style={styles.text}>Total money spent by the group: 
          <Text style={styles.textColor}> {group.currency}{totalGroupExpense}</Text>
        </Text>
        {
          expensesPerPersonTotal.map(person => {
            const key = Object.keys(person)[0];
            return (
              <Text key={`${key}-1`} style={styles.text}>
                {key}
                <Text key={`${key}-2`} style={styles.textColor}>
                  {person[key] > 0 ? ' receives ' : ' owes '}
                </Text>
                {group.currency}{Math.abs(person[key])}
              </Text>
            );
          })
        }
        <Text style={styles.summary}>Summary</Text>
        {balances === null || balances.length === 0
          ?
            <Text style={styles.text}>It looks like your expenses tab is empty.</Text>
          :
            balances.map((balance, index) => {
              const key = `${balance.person}${balance.personToPay}${balance.payment}`;
              return (
                <Text key={`${key}-1`} style={styles.text}>
                  <Text key={`${key}-2`} style={styles.textColor}>{balance.person} </Text>
                  pays 
                  <Text key={`${key}-3`} style={styles.textColor}> {balance.personToPay} </Text>
                  {group.currency}{balance.payment}
                </Text>
              )
            })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '3%'
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#D3D3D3',
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '3%',
  },
  textColor: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#75559F',
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '3%',
  },
  summary: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: '10%',
    marginLeft: '5%',
  }
});