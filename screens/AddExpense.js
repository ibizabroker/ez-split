import { Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import React, { useState } from 'react';
import AppBarWithBack from '../components/AppBarWithBack';
import { Input, Button, Dialog, ListItem } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpense({ route, navigation }) {
  navigation = useNavigation();
  const { group } = route.params;

	const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
	const [text, setText] = useState('');
  const [paidBy, setPaidBy] = useState('');
	const [checked, setChecked] = useState({});
	const [members, setMembers] = useState([]);
	const [member, setMember] = useState("");
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);

	const getNameById = (value, list) => {
		var i, len = list.length;

		for (i = 0; i < len; i++) {
			if (list[i] && list[i]["abbreviation"] == value) {
				return list[i]["symbol"];
			}
		}

		return -1;
	}

  const onChange = (event, selectedDate) => {
		console.log(selectedDate);
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);

		let tempDate = new Date(currentDate);

		const dates = tempDate.toISOString();
		const index = dates.indexOf('T');
		const out = dates.substring(0, index);

		setText(out.split("-").reverse().join("-"));
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const deleteMember = (value) => {
		setMembers(oldMembers => {
			return oldMembers.filter(member => member !== value)
		})
	}

	const toggleDialog1 = () => {
		setVisible1(!visible1);
	};

	const toggleDialog2 = () => {
		setVisible2(!visible2);
	};

	const toggleDialog3 = () => {
		setVisible3(!visible3);
	};

  const toggleDialog4 = () => {
		setVisible4(!visible4);
	};

	const submitData = async () => {
		// if (title === '' || currency === '' || members.length === 0) {
		// 	toggleDialog1();
		// }
		// else if(members.length === 1) {
		// 	toggleDialog2();
		// }
		// else {
		// 	let currencySymbol = getNameById(currency[0], currencyList);

		// 	try {
		// 		const group = {
		// 			title: title,
		// 			currency: currencySymbol,
		// 			members: members,
		// 		}
		// 		const array = [];
		// 		// AsyncStorage.clear();
		// 		await AsyncStorage.getItem('Groups')
		// 			.then(async value => {
		// 				if (value === null) {
		// 					array.push(group);
		// 					await AsyncStorage.setItem('Groups', JSON.stringify(array));
    //           setTitle('');
    //           setCurrency([]);
    //           setMembers([]);
		// 				}
    //         else {
    //           let arrayNew = JSON.parse(value);
    //           if(arrayNew.some(i => i.title === title)) {
    //             toggleDialog4();
    //           }
    //           else {
    //             arrayNew.push(group);
    //             await AsyncStorage.setItem('Groups', JSON.stringify(arrayNew));
    //             setTitle('');
    //             setCurrency([]);
    //             setMembers([]);
    //           }
    //         }
		// 		})

		// 		// await AsyncStorage.getItem('Groups')
		// 		// 	.then(value => {
		// 		// 		console.log("value2", JSON.parse(value));
		// 		// })
        
		// 		navigation.navigate("Groups");

		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// }
		console.log(checked);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		<View style={styles.containerInitial}>
			<AppBarWithBack ez={'EZ '} split={'Split'} />

			<SafeAreaView style={styles.container}>
				<Input
					placeholder='Title'
					placeholderTextColor='#808080'
					selectionColor={'#808080'}
					containerStyle={styles.containerStyleTitle}
					inputContainerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle}
					renderErrorMessage={false}
					value={title}
					onChangeText={title => setTitle(title)}
				/>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '5%'}}>
          <Button
						title={group.currency}
						titleStyle={{
							fontFamily: 'Montserrat', 
							fontSize: 17, 
							color: '#D3D3D3'
						}}
						buttonStyle={{
							marginRight: 5,
              borderRadius: 10,
							height: 60,
							width: 63,
						}}
						disabled={true}
						disabledStyle={{
							backgroundColor: '#332940',
							color: '#D3D3D3'
						}}
					/>
          <Input
            placeholder='Amount'
            placeholderTextColor='#808080'
            selectionColor={'#808080'}
            containerStyle={styles.containerStyleAmount}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            renderErrorMessage={false}
            value={amount}
            keyboardType='numeric'
            onChangeText={amount => setAmount(amount)}
          />		
				</View>

        <Button 
					title={text === '' ? 'Date' : text}
          type={'outlined'}
					titleStyle={{
						fontFamily: 'Montserrat', 
						fontSize: 16, 
						color: text === '' ? '#808080': '#D3D3D3',
            marginLeft: 10
					}}
					buttonStyle={{
						alignSelf: 'center',
            justifyContent: 'flex-end',
						borderWidth: 2,
            borderRadius: 10,
            borderColor: '#332940',
            backgroundColor: '#1E1E1E',
						height: 60,
						width: '80%',
            marginTop: '5%',
					}}
          icon={{
            name: 'calendar-today',
            size: 16,
            color: text === '' ? '#808080': '#D3D3D3',
          }}
          iconPosition='right'
					onPress={showDatepicker}
				/>
        {show && (
          <DateTimePicker
            display={Platform.OS === "ios" ? "spinner" : "default"}
            timeZoneOffsetInMinutes={60}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            onChange={onChange}
            dateFormat="dayofweek day month"
            accentColor="#1D3557"
          />
        )}

        <SelectDropdown
          data={group.members}
          onSelect={(selectedItem, index) => {
            setPaidBy(selectedItem);
          }}
          defaultButtonText={'Paid By'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          buttonStyle={{
            alignSelf: 'center',
						borderWidth: 2,
            borderRadius: 10,
            borderColor: '#332940',
            backgroundColor: '#1E1E1E',
						height: 60,
						width: '80%',
            marginTop: '5%',
          }}
          buttonTextStyle={{
            fontFamily: 'Montserrat', 
						fontSize: 16, 
						color: paidBy === '' ? '#808080': '#D3D3D3',
            textAlign: 'left',
            marginLeft: 12
          }}
          renderDropdownIcon={() => {
            return <Icon name="keyboard-arrow-down" color={paidBy === '' ? '#808080': '#D3D3D3'} size={25} style={{marginRight: 12}} />
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={{
            backgroundColor: '#121212',
            borderRadius: 10
          }}
          rowStyle={{
            borderBottomColor: '#332940',
          }}
          rowTextStyle={{
            fontFamily: 'Montserrat', 
						fontSize: 16, 
						color: '#D3D3D3',
          }}
          search={true}
          searchInputStyle={{
            backgroundColor: '#1E1E1E',
            borderBottomWidth: 1,
            borderBottomColor: '#332940',
            selectionColor: '#808080'
          }}
          searchInputTxtStyle={{
            fontFamily: 'Montserrat', 
						fontSize: 16, 
						color: '#D3D3D3',
          }}
          searchInputTxtColor='#D3D3D3'
          searchPlaceHolder='Who Paid?'
          searchPlaceHolderColor='#808080'
          renderSearchInputLeftIcon={() => {
            return <Icon name="search" color='#D3D3D3' size={20} />
          }}
          statusBarTranslucent={true}
        />

				{/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '5%'}}>
					<Input
						placeholder='Add Members'
						placeholderTextColor='#808080'
						selectionColor={'#808080'}
						containerStyle={styles.containerStyleMembers}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						value={member}
						onChangeText={member => setMember(member)}
					/>
					<Button
						title="Add"
						titleStyle={{
							fontFamily: 'Montserrat', 
							fontSize: 16, 
							color: '#D3D3D3'
						}}
						buttonStyle={{
							borderRadius: 10,
							height: 60,
							width: 69,
							backgroundColor: '#332940'
						}}
						disabled={member.length === 0 ? true : false}
						disabledStyle={{
							backgroundColor: '#808080',
							color: '#D3D3D3'
						}}
						onPress={() => {
							if(members.includes(member)) {
								toggleDialog3();
							}
							else {
								members.push(member); 
							}							
							setMember('')
						}}
					/>
				</View> */}

				<Text style={styles.participationText}>
					Participation
				</Text>
				<ScrollView>
						{
							group.members.map((member, index) => {
								return (
									<ListItem
                    key={index}
                    containerStyle={{
                      backgroundColor: '#121212',
                      borderBottomWidth: 2,
                      borderBottomColor: '#332940',
                    }}
                    onPress={() => {
											setChecked(prevState => {
												return { ...prevState, [index]: !prevState[index] };
											});
                    }}
                  >
                    <ListItem.Content 
											style={{
												flexDirection: 'row', 
												justifyContent: 'flex-start',
												alignItems: 'center'
											}}
										>
											<ListItem.CheckBox 
												size={24} 
												iconType='material-community'
           							checkedIcon='checkbox-outline'
           							uncheckedIcon='checkbox-blank-outline'
												uncheckedColor='#D3D3D3'
												checkedColor='#332940'
												checked={checked[index] || false}
												onPress={() => {
													setChecked(prevState => {
														return { ...prevState, [index]: !prevState[index] };
													});
												}}
												containerStyle={{
													marginLeft: '7%',
													backgroundColor: '#121212'
												}}
											/>
                      <ListItem.Title
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: 16,
                          color: '#D3D3D3',
                          marginLeft: '5%'
                        }}
                      >
												{member}
											</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
								);
							})
						}
				</ScrollView>
							
				<Button 
					title="Submit"
					titleStyle={{
						fontFamily: 'Montserrat', 
						fontSize: 16, 
						color: '#D3D3D3'
					}}
					buttonStyle={{
						marginTop: 18,
						alignSelf: 'center',
						borderRadius: 10,
						height: 45,
						width: '80%',
						backgroundColor: '#332940'
					}}
					onPress={() => {submitData()}}
				/>

				<Dialog
					isVisible={visible1}
					onBackdropPress={toggleDialog1}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Bro?</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Stop being lazy and fill everything.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog1()}/>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					isVisible={visible2}
					onBackdropPress={toggleDialog2}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Loner Alert!</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Add one more person.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog2()}/>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					isVisible={visible3}
					onBackdropPress={toggleDialog3}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Hmmmm</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Repeating the same name doesn't mean multiple friends.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog3()}/>
					</Dialog.Actions>
				</Dialog>

        <Dialog
					isVisible={visible4}
					onBackdropPress={toggleDialog4}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Oops</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>You already used this title once.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog4()}/>
					</Dialog.Actions>
				</Dialog>
			</SafeAreaView>

		</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
  containerInitial: {
    flex: 1,
    backgroundColor: '#121212'
  },
  container: {
    flex: 1,
    marginTop: '5%',
    marginBottom: '5%',
  },
	containerStyleTitle: {
		marginTop: '5%',
		borderWidth: 2,
    borderRadius: 10,
    borderColor: '#332940',
    backgroundColor: '#1E1E1E',
		height: 60,
		width: '80%',
		alignSelf: 'center'
	},
	containerStyleAmount: {
		borderWidth: 2,
    borderRadius: 10,
    borderColor: '#332940',
    backgroundColor: '#1E1E1E',
		height: 60,
		width: '63%',
	},
  inputContainerStyle: {
		borderBottomWidth: 0,
    height: 60,
  },
  inputStyle: {
    marginLeft: 10,
    fontFamily: 'Montserrat', 
    fontSize: 16,
    color: '#D3D3D3',
    paddingBottom: 4,
  },
	participationText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 16,
		color: '#D3D3D3',
		marginLeft: '10%',
		marginTop: '8%',
		marginBottom: '2%'
	}
});