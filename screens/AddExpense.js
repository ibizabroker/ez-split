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

	const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
	const [text, setText] = useState('');
  const [paidBy, setPaidBy] = useState('');
	const [checked, setChecked] = useState({});
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [visible4, setVisible4] = useState(false);
	const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);

  const onChange = (event, selectedDate) => {
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

	const toggleDialog5 = () => {
		setVisible5(!visible5);
	};

  const toggleDialog6 = () => {
		setVisible6(!visible6);
	};

	const submitData = async () => {
		let participation = [];
		for (let key in checked) {
			if (checked.hasOwnProperty(key)) {
				let val = checked[key];
				if (val === true) {
					participation.push(group.members[key]);
				}
			}
		}
		// AsyncStorage.removeItem(group.title);

		if (title === '') {
			toggleDialog1();
		}
		else if(amount === 0) {
			toggleDialog2();
		}
		else if(text === '') {
			toggleDialog3();
		}
		else if(paidBy === '') {
			toggleDialog4();
		}
		else if(participation.length === 0) {
			toggleDialog5();
		}
		else {
			try {
				const expense = {
					expenseTitle: title,
					amount: amount,
					date: text,
					paidBy: paidBy,
					participation: participation
				}
				const array = [];

				await AsyncStorage.getItem(group.title)
					.then(async value => {
						if (value === null) {
							array.push(expense);
							await AsyncStorage.setItem(group.title, JSON.stringify(array));
              setTitle('');
              setAmount(0);
              setText('');
							setPaidBy('');
							setChecked({});
							navigation.pop();
						}
            else {
              let arrayNew = JSON.parse(value);
              if(arrayNew.some(i => i.expenseTitle === title)) {
                toggleDialog6();
              }
              else {
                arrayNew.push(expense);
                await AsyncStorage.setItem(group.title, JSON.stringify(arrayNew));
                setTitle('');
								setAmount(0);
								setText('');
								setPaidBy('');
								setChecked({});
								navigation.pop();
              }
            }
				})

				// await AsyncStorage.getItem(group.title)
				// 	.then(value => {
				// 		console.log("value", JSON.parse(value));
				// })
        
			} catch (error) {
				console.log(error);
			}
		}
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
					onPress={() => {
						Keyboard.dismiss();
						showDatepicker();
					}}
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
					onFocus={() => {
						Keyboard.dismiss();
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

				<Text style={styles.participationText}>
					Participants
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
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Yo</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Adding a title to the expense will look good.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog1()}/>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					isVisible={visible2}
					onBackdropPress={toggleDialog2}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Hello?</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>An expense without an amount sounds kinda sus.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog2()}/>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					isVisible={visible3}
					onBackdropPress={toggleDialog3}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Come on</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Is it that hard to fill in the date?</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog3()}/>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					isVisible={visible4}
					onBackdropPress={toggleDialog4}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Who paid?</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>I know you didn't pay.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog4()}/>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					isVisible={visible5}
					onBackdropPress={toggleDialog5}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Huh</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Who did you split it with?</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog5()}/>
					</Dialog.Actions>
				</Dialog>

        <Dialog
					isVisible={visible6}
					onBackdropPress={toggleDialog6}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, marginBottom: 10, color: '#D3D3D3'}}>Oops</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>You already used this title once.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog6()}/>
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