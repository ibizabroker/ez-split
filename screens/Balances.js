import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { RFValue } from "react-native-responsive-fontsize";

export default function Balances(props) {
  const group = props.group;
  const fetchData = props.fetchData;
  const totalGroupExpense = props.totalGroupExpense;
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
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          collapsable={false}
          ref={(view) => {this.captureBalances = view}}
        >
          <Text style={styles.heading}>{group.title}</Text>
          <Text style={styles.text}>Total money spent by the group: 
            <Text style={styles.textColor}> {group.currency}{totalGroupExpense}</Text>
          </Text>
          {
            expensesPerPersonTotal.map(person => {
              const key = Object.keys(person)[0];
              if(person[key] === 0) return null;
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
        </View>
      </ScrollView>
    </View>
  )
}

export const onCapture = (ref) => {
  captureRef(ref, {
    format: "png",
    quality: 1,
    result: "tmpfile"
  }).then(
    uri => {
      if (Platform.OS === "ios") {
        Sharing.shareAsync('file://' + uri);
      }
      else {
        let uriArray = uri.split("/");
        let nameToChange = uriArray[uriArray.length - 1];
        let renamedURI = uri.replace(
          nameToChange, "Expenses.png"
        );
        FileSystem.copyAsync({from: uri, to: renamedURI}).then(() => {
          Sharing.shareAsync('file://' + renamedURI);
        })
      } 
    },
    error => console.error('Export failed', error)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '5%'
  },
  heading: {
    fontFamily: 'Montserrat-Medium',
    fontSize: RFValue(18.5),
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '3%'
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: RFValue(14.5),
    color: '#D3D3D3',
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '3%',
  },
  textColor: {
    fontFamily: 'Montserrat',
    fontSize: RFValue(14.5),
    color: '#75559F',
    textAlign: 'left',
    marginLeft: '5%',
    marginTop: '3%',
  },
  summary: {
    fontFamily: 'Montserrat-Medium',
    fontSize: RFValue(18.5),
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: '10%',
    marginLeft: '5%',
  }
});