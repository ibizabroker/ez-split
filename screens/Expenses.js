import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ListItem, Divider, Button } from '@rneui/themed';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from "react-native-responsive-fontsize";

export default function Expenses(props) {
  const group = props.group;
  const fetchDataBalances = props.fetchDataBalances;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [expenses, setExpenses] = useState([]);

  const fetchData = async () => {
     await AsyncStorage.getItem(group.title)
      .then(value => {
        let groupExpense = JSON.parse(value);
        setExpenses(groupExpense);
    })
  }

  useEffect(() => {
    if(isFocused) {
      fetchData();
      fetchDataBalances();
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.heading}>{group.title}</Text>

        {expenses === null || expenses.length === 0
          ?
            <></>
          :
            <Divider width={2.2} color='#332940' />
        }
        {expenses === null || expenses.length === 0
          ? 
            <View style={styles.containerText}>
              <Text style={styles.noExpensesText}>You don't have any expenses added to this group yet. Click on the Add Expense button below to proceed.</Text>
            </View>
          :              
          expenses.map((item) => {
              return (
                <ListItem
                  key={item.expenseTitle}
                  containerStyle={{
                    backgroundColor: '#121212',
                    borderBottomWidth: 2,
                    borderBottomColor: '#332940',
                  }}
                  onPress={() => {
                    navigation.navigate("ExpenseDetails", {expense: item, group});
                  }}
                >
                  <View style={styles.listContainer}>
                    <View style={{marginLeft: '5%', width: '60%'}}>
                      <ListItem.Title
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: RFValue(12.5),
                          color: '#75559F',
                          marginBottom: 5,
                        }}
                      >
                        {item.expenseTitle}
                      </ListItem.Title>
                      <ListItem.Subtitle
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: RFValue(10.5),
                          color: '#808080',
                        }}
                      >
                        Paid By {item.paidBy}
                      </ListItem.Subtitle>
                    </View>
                    <View style={{marginRight: '5%'}}>
                      <ListItem.Title 
                        style={{
                          textAlign: 'right',
                          fontFamily: 'Montserrat',
                          fontSize: RFValue(12.5),
                          color: '#75559F',
                          marginBottom: 5
                        }}
                      >
                        {group.currency}{item.amount}
                      </ListItem.Title>
                      <ListItem.Subtitle 
                        style={{
                          textAlign: 'right',
                          fontFamily: 'Montserrat',
                          fontSize: RFValue(10.5),
                          color: '#808080',
                        }}
                      >
                        {item.date}
                      </ListItem.Subtitle>
                    </View>
                  </View>
                </ListItem>
              )
            })       
          } 
          <ListItem
            containerStyle={{
              backgroundColor: '#121212',
            }}
          >
            <ListItem.Content>
              <ListItem.Title />
              <ListItem.Subtitle />
              <ListItem.Subtitle />
            </ListItem.Content>
          </ListItem>
      </ScrollView>

      <Button 
        title="Add Expense"
        titleStyle={{
          fontFamily: 'Montserrat', 
          fontSize: RFValue(14.5), 
          color: '#D3D3D3'
        }}
        buttonStyle={{
          width: 'auto',
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: '#332940'
        }}
        containerStyle={{
          bottom: 25,
          right: 25,
          position: 'absolute',
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
    fontSize: RFValue(18.5),
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '3%'
  },
  containerText: {
    flex: 1,
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noExpensesText: {
    fontFamily: 'Montserrat',
    fontSize: RFValue(14.5),
    color: '#D3D3D3',
    textAlign: 'center'
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});