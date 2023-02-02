import React, { useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import AppBarWithBack from './AppBarWithBack';
import Expenses from '../screens/Expenses';
import Balances from '../screens/Balances';
import Export from '../screens/Export';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from "react-native-responsive-fontsize";

const GroupTabs = ({ route }) => {
  const [index, setIndex] = useState(0);
  const { group } = route.params;

  const [totalGroupExpense, setTotalGroupExpense] = useState(0);
  const [balances, setBalances] = useState([]);
  const [expensesPerPersonTotal, setExpensesPerPersonTotal] = useState([]);
  const [jsonForExcel, setJsonForExcel] = useState([]);

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
      group.members.forEach(person => {
        let expense = tempExpenses.find(e => Object.keys(e)[0] === person);
        if (!expense) {
            expense = { [person]: [] };
            tempExpenses.push(expense);
        }
      });
      tempExpenses.forEach(expense => {
        let person = Object.keys(expense)[0];
        if(!event.participation.includes(person)) {
          expense[person].push(person === event.paidBy ? parseFloat(event.amount) : 0);
        }
        else {
          expense[person].push(person === event.paidBy ? amountPerPerson*(event.participation.length-1) : -amountPerPerson);
        }
        expense[person] = expense[person].map(val => parseFloat(val.toFixed(2)));
      });
    });

    const tempExpensesPerPersonTotal = tempExpenses.map(person => {
      const key = Object.keys(person)[0];
      const values = person[key];
      let total = values.reduce((a, b) => a + b, 0);
      total = parseFloat(total.toFixed(2));
      return { [key]: total };
    });

    setExpensesPerPersonTotal(tempExpensesPerPersonTotal);

    let json1 = expenses;
    let json2 = tempExpenses;
    let json3 = tempExpensesPerPersonTotal;
    for (let i = 0; i < json1.length; i++) {
      for (let j = 0; j < json2.length; j++) {
        const key = Object.keys(json2[j])[0];
        json1[i][key] = json2[j][key][i];
      }
    }

    let json = json1.map(expense => {
      const { participation, ...newExpense } = expense;
      return newExpense;
    });

    let json4 = json3.reduce(function(acc, curr) {
      return Object.assign(acc, curr);
    }, []);
    json4 = Object.assign(json4, {"paidBy": "total"});
    json.push(json4);

    setJsonForExcel(json);

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
            fontSize: RFValue(12.5),
            color: index === 0 ? '#FFFFFF' : '#808080'
          }}
        />
        <Tab.Item
          title="Balances"
          titleStyle={{ 
            fontFamily: 'Montserrat', 
            fontSize: RFValue(12.5),
            color: index === 1 ? '#FFFFFF' : '#808080'
          }}
        />
        <Tab.Item
          title="Export"
          titleStyle={{ 
            fontFamily: 'Montserrat', 
            fontSize: RFValue(12.5),
            color: index === 2 ? '#FFFFFF' : '#808080'
          }}
        />
      </Tab>

      <TabView 
        value={index} 
        onChange={setIndex} 
        animationType="spring"
        springConfig={{ overshootClamping: 1 }}
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
            expensesPerPersonTotal={expensesPerPersonTotal}
            balances={balances}
            fetchData={fetchData}
          />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Export 
            group={group}
            jsonForExcel={jsonForExcel}
          />
        </TabView.Item>
      </TabView>
    </>
  );
};

export default GroupTabs;