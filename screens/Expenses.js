import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ListItem, Divider, Button, Dialog } from '@rneui/themed';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Expenses(props) {
  const group = props.group;
  const fetchDataBalances = props.fetchDataBalances;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [expenses, setExpenses] = useState([]);
  const [deleteKey, setDeleteKey] = useState('');
  const [deleteValue, setDeleteValue] = useState({});
	const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
		setVisible(!visible);
	};

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
    }
  }, [isFocused])

  const removeJSON = async (key, value) => {
    try {
        const jsonArray = await AsyncStorage.getItem(key);
        let parsedArray = JSON.parse(jsonArray);
        parsedArray = parsedArray.filter(item => !(item.expenseTitle === value.expenseTitle));

        await AsyncStorage.setItem(key, JSON.stringify(parsedArray));
        fetchData();
        fetchDataBalances();
        toggleDialog();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.heading}>{group.title}</Text>

        {expenses === null || expenses.length === 0
          ?
            <></>
          :
            <Divider width={2.5} color='#332940' />
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
                  onLongPress={() => {
                    setDeleteKey(group.title);
                    setDeleteValue(item);
                    toggleDialog();              
                  }}
                >
                  <View style={styles.listContainer}>
                    <View style={{marginLeft: '5%', width: '60%'}}>
                      <ListItem.Title
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: 14,
                          color: '#75559F',
                          marginBottom: 5,
                        }}
                      >
                        {item.expenseTitle}
                      </ListItem.Title>
                      <ListItem.Subtitle
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: 12,
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
                          fontSize: 14,
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
                          fontSize: 12,
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
          fontSize: 16, 
          color: '#D3D3D3'
        }}
        buttonStyle={{
          width: 150,
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

      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
      >
        <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Delete?</Text>
				<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Are you sure you want to delete this expense?</Text>
        <Dialog.Actions>
          <Dialog.Button title="No, go back" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog()}/>
          <Dialog.Button title="Yes" titleStyle={{fontFamily: 'Montserrat-Medium', color: 'red'}} onPress={() => removeJSON(deleteKey, deleteValue)}/>
        </Dialog.Actions>
      </Dialog>
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
    fontSize: 16,
    color: '#D3D3D3',
    textAlign: 'center'
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});