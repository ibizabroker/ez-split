import { Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import AppBar from '../components/AppBar';
import { Input, Button, Chip, Dialog } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const currencyList = [
  {
    currency: "Albania Lek (ALL)",
    abbreviation: "ALL",
    symbol: "Lek"
  },
  {
    currency: "Afghanistan Afghani (AFN)",
    abbreviation: "AFN",
    symbol: "؋"
  },
  {
    currency: "Argentina Peso (ARS)",
    abbreviation: "ARS",
    symbol: "$"
  },
  {
    currency: "Aruba Guilder (AWG)",
    abbreviation: "AWG",
    symbol: "ƒ"
  },
  {
    currency: "Australia Dollar (AUD)",
    abbreviation: "AUD",
    symbol: "$"
  },
  {
    currency: "Azerbaijan New Manat (AZN)",
    abbreviation: "AZN",
    symbol: "ман"
  },
  {
    currency: "Bahamas Dollar (BSD)",
    abbreviation: "BSD",
    symbol: "$"
  },
  {
    currency: "Barbados Dollar (BBD)",
    abbreviation: "BBD",
    symbol: "$"
  },
  {
    currency: "Belarus Ruble (BYR)",
    abbreviation: "BYR",
    symbol: "p."
  },
  {
    currency: "Belize Dollar (BZD)",
    abbreviation: "BZD",
    symbol: "BZ$"
  },
  {
    currency: "Bermuda Dollar (BMD)",
    abbreviation: "BMD",
    symbol: "$"
  },
  {
    currency: "Bolivia Boliviano (BOB)",
    abbreviation: "BOB",
    symbol: "$b"
  },
  {
    currency: "Bosnia and Herzegovina Convertible Marka (BAM)",
    abbreviation: "BAM",
    symbol: "KM"
  },
  {
    currency: "Botswana Pula (BWP)",
    abbreviation: "BWP",
    symbol: "P"
  },
  {
    currency: "Bulgaria Lev (BGN)",
    abbreviation: "BGN",
    symbol: "лв"
  },
  {
    currency: "Brazil Real (BRL)",
    abbreviation: "BRL",
    symbol: "R$"
  },
  {
    currency: "Brunei Darussalam Dollar (BND)",
    abbreviation: "BND",
    symbol: "$"
  },
  {
    currency: "Cambodia Riel (KHR)",
    abbreviation: "KHR",
    symbol: "៛"
  },
  {
    currency: "Canada Dollar (CAD)",
    abbreviation: "CAD",
    symbol: "$"
  },
  {
    currency: "Cayman Islands Dollar (KYD)",
    abbreviation: "KYD",
    symbol: "$"
  },
  {
    currency: "Chile Peso (CLP)",
    abbreviation: "CLP",
    symbol: "$"
  },
  {
    currency: "China Yuan Renminbi (CNY)",
    abbreviation: "CNY",
    symbol: "¥"
  },
  {
    currency: "Colombia Peso (COP)",
    abbreviation: "COP",
    symbol: "$"
  },
  {
    currency: "Costa Rica Colon (CRC)",
    abbreviation: "CRC",
    symbol: "₡"
  },
  {
    currency: "Croatia Kuna (HRK)",
    abbreviation: "HRK",
    symbol: "kn"
  },
  {
    currency: "Cuba Peso (CUP)",
    abbreviation: "CUP",
    symbol: "₱"
  },
  {
    currency: "Czech Republic Koruna (CZK)",
    abbreviation: "CZK",
    symbol: "Kč"
  },
  {
    currency: "Denmark Krone (DKK)",
    abbreviation: "DKK",
    symbol: "kr"
  },
  {
    currency: "Dominican Republic Peso (DOP)",
    abbreviation: "DOP",
    symbol: "RD$"
  },
  {
    currency: "East Caribbean Dollar (XCD)",
    abbreviation: "XCD",
    symbol: "$"
  },
  {
    currency: "Egypt Pound (EGP)",
    abbreviation: "EGP",
    symbol: "£"
  },
  {
    currency: "El Salvador Colon (SVC)",
    abbreviation: "SVC",
    symbol: "$"
  },
  {
    currency: "Estonia Kroon (EEK)",
    abbreviation: "EEK",
    symbol: "kr"
  },
  {
    currency: "Euro Member Countries (EUR)",
    abbreviation: "EUR",
    symbol: "€"
  },
  {
    currency: "Falkland Islands Pound (FKP)",
    abbreviation: "FKP",
    symbol: "£"
  },
  {
    currency: "Fiji Dollar (FJD)",
    abbreviation: "FJD",
    symbol: "$"
  },
  {
    currency: "Ghana Cedis (GHC)",
    abbreviation: "GHC",
    symbol: "¢"
  },
  {
    currency: "Gibraltar Pound (GIP)",
    abbreviation: "GIP",
    symbol: "£"
  },
  {
    currency: "Guatemala Quetzal (GTQ)",
    abbreviation: "GTQ",
    symbol: "Q"
  },
  {
    currency: "Guernsey Pound (GGP)",
    abbreviation: "GGP",
    symbol: "£"
  },
  {
    currency: "Guyana Dollar (GYD)",
    abbreviation: "GYD",
    symbol: "$"
  },
  {
    currency: "Honduras Lempira (HNL)",
    abbreviation: "HNL",
    symbol: "L"
  },
  {
    currency: "Hong Kong Dollar (HKD)",
    abbreviation: "HKD",
    symbol: "$"
  },
  {
    currency: "Hungary Forint (HUF)",
    abbreviation: "HUF",
    symbol: "Ft"
  },
  {
    currency: "Iceland Krona (ISK)",
    abbreviation: "ISK",
    symbol: "kr"
  },
  {
    currency: "India Rupee (INR)",
    abbreviation: "INR",
    symbol: "₹"
  },
  {
    currency: "Indonesia Rupiah (IDR)",
    abbreviation: "IDR",
    symbol: "Rp"
  },
  {
    currency: "Iran Rial (IRR)",
    abbreviation: "IRR",
    symbol: "﷼"
  },
  {
    currency: "Isle of Man Pound (IMP)",
    abbreviation: "IMP",
    symbol: "£"
  },
  {
    currency: "Israel Shekel (ILS)",
    abbreviation: "ILS",
    symbol: "₪"
  },
  {
    currency: "Jamaica Dollar (JMD)",
    abbreviation: "JMD",
    symbol: "J$"
  },
  {
    currency: "Japan Yen (JPY)",
    abbreviation: "JPY",
    symbol: "¥"
  },
  {
    currency: "Jersey Pound (JEP)",
    abbreviation: "JEP",
    symbol: "£"
  },
  {
    currency: "Kazakhstan Tenge (KZT)",
    abbreviation: "KZT",
    symbol: "лв"
  },
  {
    currency: "Korea (North) Won (KPW)",
    abbreviation: "KPW",
    symbol: "₩"
  },
  {
    currency: "Korea (South) Won (KRW)",
    abbreviation: "KRW",
    symbol: "₩"
  },
  {
    currency: "Kyrgyzstan Som (KGS)",
    abbreviation: "KGS",
    symbol: "лв"
  },
  {
    currency: "Laos Kip (LAK)",
    abbreviation: "LAK",
    symbol: "₭"
  },
  {
    currency: "Latvia Lat (LVL)",
    abbreviation: "LVL",
    symbol: "Ls"
  },
  {
    currency: "Lebanon Pound (LBP)",
    abbreviation: "LBP",
    symbol: "£"
  },
  {
    currency: "Liberia Dollar (LRD)",
    abbreviation: "LRD",
    symbol: "$"
  },
  {
    currency: "Lithuania Litas (LTL)",
    abbreviation: "LTL",
    symbol: "Lt"
  },
  {
    currency: "Macedonia Denar (MKD)",
    abbreviation: "MKD",
    symbol: "ден"
  },
  {
    currency: "Malaysia Ringgit (MYR)",
    abbreviation: "MYR",
    symbol: "RM"
  },
  {
    currency: "Mauritius Rupee (MUR)",
    abbreviation: "MUR",
    symbol: "₨"
  },
  {
    currency: "Mexico Peso (MXN)",
    abbreviation: "MXN",
    symbol: "$"
  },
  {
    currency: "Mongolia Tughrik (MNT)",
    abbreviation: "MNT",
    symbol: "₮"
  },
  {
    currency: "Mozambique Metical (MZN)",
    abbreviation: "MZN",
    symbol: "MT"
  },
  {
    currency: "Namibia Dollar (NAD)",
    abbreviation: "NAD",
    symbol: "$"
  },
  {
    currency: "Nepal Rupee (NPR)",
    abbreviation: "NPR",
    symbol: "₨"
  },
  {
    currency: "Netherlands Antilles Guilder (ANG)",
    abbreviation: "ANG",
    symbol: "ƒ"
  },
  {
    currency: "New Zealand Dollar (NZD)",
    abbreviation: "NZD",
    symbol: "$"
  },
  {
    currency: "Nicaragua Cordoba (NIO)",
    abbreviation: "NIO",
    symbol: "C$"
  },
  {
    currency: "Nigeria Naira (NGN)",
    abbreviation: "NGN",
    symbol: "₦"
  },
  {
    currency: "Norway Krone (NOK)",
    abbreviation: "NOK",
    symbol: "kr"
  },
  {
    currency: "Oman Rial (OMR)",
    abbreviation: "OMR",
    symbol: "﷼"
  },
  {
    currency: "Pakistan Rupee (PKR)",
    abbreviation: "PKR",
    symbol: "₨"
  },
  {
    currency: "Panama Balboa (PAB)",
    abbreviation: "PAB",
    symbol: "B/."
  },
  {
    currency: "Paraguay Guarani (PYG)",
    abbreviation: "PYG",
    symbol: "Gs"
  },
  {
    currency: "Peru Nuevo Sol (PEN)",
    abbreviation: "PEN",
    symbol: "S/."
  },
  {
    currency: "Philippines Peso (PHP)",
    abbreviation: "PHP",
    symbol: "₱"
  },
  {
    currency: "Poland Zloty (PLN)",
    abbreviation: "PLN",
    symbol: "zł"
  },
  {
    currency: "Qatar Riyal (QAR)",
    abbreviation: "QAR",
    symbol: "﷼"
  },
  {
    currency: "Romania New Leu (RON)",
    abbreviation: "RON",
    symbol: "lei"
  },
  {
    currency: "Russia Ruble (RUB)",
    abbreviation: "RUB",
    symbol: "₽"
  },
  {
    currency: "Saint Helena Pound (SHP)",
    abbreviation: "SHP",
    symbol: "£"
  },
  {
    currency: "Saudi Arabia Riyal (SAR)",
    abbreviation: "SAR",
    symbol: "﷼"
  },
  {
    currency: "Serbia Dinar (RSD)",
    abbreviation: "RSD",
    symbol: "Дин."
  },
  {
    currency: "Seychelles Rupee (SCR)",
    abbreviation: "SCR",
    symbol: "₨"
  },
  {
    currency: "Singapore Dollar (SGD)",
    abbreviation: "SGD",
    symbol: "$"
  },
  {
    currency: "Solomon Islands Dollar (SBD)",
    abbreviation: "SBD",
    symbol: "$"
  },
  {
    currency: "Somalia Shilling (SOS)",
    abbreviation: "SOS",
    symbol: "S"
  },
  {
    currency: "South Africa Rand (ZAR)",
    abbreviation: "ZAR",
    symbol: "R"
  },
  {
    currency: "Sri Lanka Rupee (LKR)",
    abbreviation: "LKR",
    symbol: "₨"
  },
  {
    currency: "Sweden Krona (SEK)",
    abbreviation: "SEK",
    symbol: "kr"
  },
  {
    currency: "Switzerland Franc (CHF)",
    abbreviation: "CHF",
    symbol: "CHF"
  },
  {
    currency: "Suriname Dollar (SRD)",
    abbreviation: "SRD",
    symbol: "$"
  },
  {
    currency: "Syria Pound (SYP)",
    abbreviation: "SYP",
    symbol: "£"
  },
  {
    currency: "Taiwan New Dollar (TWD)",
    abbreviation: "TWD",
    symbol: "NT$"
  },
  {
    currency: "Thailand Baht (THB)",
    abbreviation: "THB",
    symbol: "฿"
  },
  {
    currency: "Trinidad and Tobago Dollar (TTD)",
    abbreviation: "TTD",
    symbol: "TT$"
  },
  {
    currency: "Turkey Lira (TRY)",
    abbreviation: "TRY",
    symbol: "₺"
  },
  {
    currency: "Turkey Lira (TRL)",
    abbreviation: "TRL",
    symbol: "₤"
  },
  {
    currency: "Tuvalu Dollar (TVD)",
    abbreviation: "TVD",
    symbol: "$"
  },
  {
    currency: "Ukraine Hryvna (UAH)",
    abbreviation: "UAH",
    symbol: "₴"
  },
  {
    currency: "United Kingdom Pound (GBP)",
    abbreviation: "GBP",
    symbol: "£"
  },
  {
    currency: "United States Dollar (USD)",
    abbreviation: "USD",
    symbol: "$"
  },
  {
    currency: "Uruguay Peso (UYU)",
    abbreviation: "UYU",
    symbol: "$U"
  },
  {
    currency: "Uzbekistan Som (UZS)",
    abbreviation: "UZS",
    symbol: "лв"
  },
  {
    currency: "Venezuela Bolivar (VEF)",
    abbreviation: "VEF",
    symbol: "Bs"
  },
  {
    currency: "Viet Nam Dong (VND)",
    abbreviation: "VND",
    symbol: "₫"
  },
  {
    currency: "Yemen Rial (YER)",
    abbreviation: "YER",
    symbol: "﷼"
  },
  {
    currency: "Zimbabwe Dollar (ZWD)",
    abbreviation: "ZWD",
    symbol: "Z$"
  }
]

export function CreateGroup() {
	const navigation = useNavigation();

	const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState([]);
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
		if (title === '' || currency === '' || members.length === 0) {
			toggleDialog1();
		}
		else if(members.length === 1) {
			toggleDialog2();
		}
		else {
			let currencySymbol = getNameById(currency[0], currencyList);

			try {
				const group = {
					title: title,
					currency: currencySymbol,
					members: members,
				}
				const array = [];
				// AsyncStorage.clear();
				await AsyncStorage.getItem('Groups')
					.then(async value => {
						if (value === null) {
							array.push(group);
							await AsyncStorage.setItem('Groups', JSON.stringify(array));
              setTitle('');
              setCurrency([]);
              setMembers([]);
						}
            else {
              let arrayNew = JSON.parse(value);
              if(arrayNew.some(i => i.title === title)) {
                toggleDialog4();
              }
              else {
                arrayNew.push(group);
                await AsyncStorage.setItem('Groups', JSON.stringify(arrayNew));
                setTitle('');
                setCurrency([]);
                setMembers([]);
              }
            }
				})

				// await AsyncStorage.getItem('Groups')
				// 	.then(value => {
				// 		console.log("value2", JSON.parse(value));
				// })
        
				navigation.navigate("Groups");

			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		<View style={styles.containerInitial}>
			<AppBar ez={'EZ '} split={'Split'} />

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

				<SectionedMultiSelect
					IconRenderer={Icon}
					items={currencyList}
					uniqueKey='abbreviation'
					displayKey='currency'
					searchPlaceholderText="Search currencies..."
					itemFontFamily={{ fontFamily: 'Montserrat' }}
					searchTextFontFamily={{ fontFamily: 'Montserrat' }}
					selectText='Select Currency'
					searchIconComponent={() => <Icon name="search" color="#D3D3D3" size={20} style={{marginLeft: 10, marginRight: 10}} />}
					noResultsComponent={() => <Text style={{fontFamily: 'Montserrat' ,color: '#D3D3D3' ,textAlign: 'center'}}>Sorry, no results.</Text>}
					colors={{ 
						text: '#D3D3D3',
						selectToggleTextColor: currency.length === 0 ? '#808080' : '#D3D3D3',
						itemBackground: '#1E1E1E',
						searchPlaceholderTextColor: '#D3D3D3',
						searchSelectionColor: '#808080'
					}}
					styles={{
						container: { 
							backgroundColor: '#1E1E1E',
							borderWidth: 2,
							borderColor: '#332940'
						},
						searchBar: {
							backgroundColor: '#1E1E1E',
						},
						searchTextInput: {
							color: '#D3D3D3'
						},
						selectToggle: {
							borderWidth: 2,
							borderRadius: 10,
							borderColor: '#332940',
							backgroundColor: '#1E1E1E', 
							height: 60,
							width: '90%',
							alignContent: 'center',
							alignSelf: 'center',
							paddingLeft: 20,
							paddingRight: 20,
							marginTop: '5%',
							marginBottom: '5%'
						},
						selectToggleText: {
							fontSize: 16,
							fontFamily: 'Montserrat',
						},
					}}
					onSelectedItemsChange={(currency) => {
						setCurrency(currency);
					}}
					selectedItems={currency}
					single={true}
					hideConfirm={true}
				/>

				<View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '5%'}}>
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
				</View>

				<ScrollView>
					<View style={{flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'flex-start', alignSelf: 'center', width: '90%'}}>
						{
							members.map((member) => {
								return (
									<Chip
										type='outlined'
										key={member}
										title={member}
										titleStyle={{
											fontFamily: 'Montserrat',
											fontSize: 12,
											color: '#D3D3D3'
										}}
										icon={{
											name: 'close',
											size: 16,
											color: '#D3D3D3',
											onPress: () => {deleteMember(member)}
										}}
										iconRight
										containerStyle={{ 
											marginRight: 10,
											marginTop: 15,
											backgroundColor: '#1E1E1E',
											borderWidth: 2,
											borderColor: '#332940'
										}}
									/>
								);
							})
						}
					</View>
				</ScrollView>
							
				<Button 
					title="Submit"
					titleStyle={{
						fontFamily: 'Montserrat', 
						fontSize: 16, 
						color: '#D3D3D3'
					}}
					buttonStyle={{
						marginTop: 30,
						alignSelf: 'center',
						borderRadius: 10,
						height: 45,
						width: '90%',
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
    margin: '5%',
  },
	containerStyleTitle: {
		marginTop: '5%',
		marginBottom: '5%',
		borderWidth: 2,
    borderRadius: 10,
    borderColor: '#332940',
    backgroundColor: '#1E1E1E',
		height: 60,
		width: '90%',
		alignSelf: 'center'
	},
	containerStyleMembers: {
		borderWidth: 2,
    borderRadius: 10,
    borderColor: '#332940',
    backgroundColor: '#1E1E1E',
		height: 60,
		width: '65%',
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
  },
});

export default CreateGroup