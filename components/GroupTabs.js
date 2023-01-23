import React, { useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import AppBarWithBack from './AppBarWithBack';
import Expenses from '../screens/Expenses';
import Balances from '../screens/Balances';
import Export from '../screens/Export';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupTabs = ({ route }) => {
  const [index, setIndex] = useState(0);
  const { group } = route.params;

  const [totalGroupExpense, setTotalGroupExpense] = useState(0);
  const [expensesPerPerson, setExpensesPerPerson] = useState([]);
  const [balances, setBalances] = useState([]);
  const [expensesPerPersonTotal, setExpensesPerPersonTotal] = useState([]);

  const fetchData = async () => {
    await AsyncStorage.getItem(group.title)
      .then(value => {
        let groupExpense = JSON.parse(value);
        if (groupExpense !== null) {
          generateTotalExpense(groupExpense);
          generateExpensesAndPayments(groupExpense);
        }
    })
  }

  const generateTotalExpense = (expenses) => {
    let groupTotal = 0;
    if(expenses != null && expenses.length != 0) {
      expenses.map((item) => {
        groupTotal = groupTotal + parseFloat(item.amount);
      })
    }
    setTotalGroupExpense(groupTotal);
  }

  const generateExpensesAndPayments = (expenses) => {
    let tempExpenses = [];
    expenses.forEach(event => {
        let amountPerPerson = event.amount / event.participation.length;
        event.participation.forEach(person => {
            let expense = tempExpenses.find(e => Object.keys(e)[0] === person);
            if (!expense) {
                expense = { [person]: [] };
                tempExpenses.push(expense);
            }
            expense[person].push(person === event.paidBy ? amountPerPerson*(event.participation.length-1) : -amountPerPerson);
        });
        tempExpenses.forEach(expense => {
            let person = Object.keys(expense)[0];
            expense[person] = expense[person].map(val => parseFloat(val.toFixed(2)));
            if(!event.participation.includes(person)) expense[person].push(0);
        });
        if(!event.participation.includes(event.paidBy)) {
            let expense = tempExpenses.find(e => Object.keys(e)[0] === event.paidBy);
            if (!expense) {
                expense = { [event.paidBy]: [] };
                tempExpenses.push(expense);
            }
            expense[event.paidBy].push(event.amount);
        }
    });

    setExpensesPerPerson(tempExpenses);

    const tempExpensesPerPersonTotal = tempExpenses.map(person => {
      const key = Object.keys(person)[0];
      const values = person[key];
      const total = values.reduce((a, b) => a + b, 0);
      return { [key]: [total] };
    });
    setExpensesPerPersonTotal(tempExpensesPerPersonTotal);    

    let payments = [];
    let tempExpensesPerPerson = {};

    tempExpenses.forEach(expense => {
      let person = Object.keys(expense)[0];
      tempExpensesPerPerson[person] = expense[person].reduce((a,b) => a + b, 0);
    });

    Object.keys(tempExpensesPerPerson).forEach(person => {
      if (tempExpensesPerPerson[person] < 0) {
        Object.keys(tempExpensesPerPerson).forEach(personToPay => {
          if (tempExpensesPerPerson[personToPay] > 0) {
            let payment = Math.min(tempExpensesPerPerson[personToPay], -tempExpensesPerPerson[person]);
            tempExpensesPerPerson[personToPay] -= payment;
            tempExpensesPerPerson[person] += payment;
            const tempPayment = {
              person: person,
              personToPay: personToPay,
              payment: parseFloat(payment.toFixed(2))
            }
            payments.push(tempPayment)
          }
        });
      }
    });

    setBalances(payments);
  }

  return (
    <>
      <AppBarWithBack ez={'EZ '} split={'Split'} />
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#332940',
          height: 3,
        }}
        containerStyle={{
          backgroundColor: '#121212',
          borderBottomWidth: 1,
          borderBottomColor: '#808080'
        }}
      >
        <Tab.Item
          title="Expenses"
          titleStyle={{
            fontFamily: 'Montserrat', 
            fontSize: 14,
            color: index === 0 ? '#FFFFFF' : '#808080'
          }}
        />
        <Tab.Item
          title="Balances"
          titleStyle={{ 
            fontFamily: 'Montserrat', 
            fontSize: 14,
            color: index === 1 ? '#FFFFFF' : '#808080'
          }}
        />
        <Tab.Item
          title="Export"
          titleStyle={{ 
            fontFamily: 'Montserrat', 
            fontSize: 14,
            color: index === 2 ? '#FFFFFF' : '#808080'
          }}
        />
      </Tab>

      <TabView 
        value={index} 
        onChange={setIndex} 
        animationType="timing"
        minSwipeRatio={0.2}
        minSwipeSpeed={0.8}
      >
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Expenses 
            group={group}
            fetchDataBalances={fetchData}
          />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Balances 
            group={group}
            totalGroupExpense={totalGroupExpense}
            expensesPerPerson={expensesPerPerson}
            expensesPerPersonTotal={expensesPerPersonTotal}
            balances={balances}
            fetchData={fetchData}
          />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Export group={group}/>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default GroupTabs;