import { Text, View, StyleSheet, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import AppBar from '../components/AppBar';
import { Input, Button, Chip } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const currencyList = [
	{
		name: "Alabama",
		id: 1001,
	},
	{
		name: "Alaska",
		id: 1002
	},
	{
		name: "Arizona",
		id: 1003
	},
	{
		name: "Arkansas",
		id: 1004
	},
	{
		name: "California",
		id: 1005
	},
	{
		name: "Colorado",
		id: 1006
	},
	{
		name: "Connecticut",
		id: 1007
	},
	{
		name: "Delaware",
		id: 1008
	},
	{
		name: "Florida",
		id: 1009
	},
	{
		name: "Georgia",
		id: 1010
	},
	{
		name: "Hawaii",
		id: 1011
	},
	{
		name: "Idaho",
		id: 1012
	},
	{
		name: "Illinois",
		id: 1013
	},
	{
		name: "Indiana",
		id: 1014
	},
	{
		name: "Iowa",
		id: 1015
	},
	{
		name: "Kansas",
		id: 1016
	},
	{
		name: "Kentucky",
		id: 1017
	},
	{
		name: "Louisiana",
		id: 1018
	},
	{
		name: "Maine",
		id: 1019
	},
	{
		name: "Maryland",
		id: 1020
	},
	{
		name: "Massachusetts",
		id: 1021
	},
	{
		name: "Michigan",
		id: 1022
	},
	{
		name: "Minnesota",
		id: 1023
	},
	{
		name: "Mississippi",
		id: 1024
	},
	{
		name: "Missouri",
		id: 1025
	},
	{
		name: "Montana",
		id: 1026
	},
	{
		name: "Nebraska",
		id: 1027
	},
	{
		name: "Nevada",
		id: 1028
	},
	{
		name: "New Hampshire",
		id: 1029
	},
	{
		name: "New Jersey",
		id: 1030
	},
	{
		name: "New Mexico",
		id: 1031
	},
	{
		name: "New York",
		id: 1032
	},
	{
		name: "North Carolina",
		id: 1033
	},
	{
		name: "North Dakota",
		id: 1034
	},
	{
		name: "Ohio",
		id: 1035
	},
	{
		name: "Oklahoma",
		id: 1036
	},
	{
		name: "Oregon",
		id: 1037
	},
	{
		name: "Pennsylvania",
		id: 1038
	},
	{
		name: "Rhode Island",
		id: 1039
	},
	{
		name: "South Carolina",
		id: 1040
	},
	{
		name: "South Dakota",
		id: 1041
	},
	{
		name: "Tennessee",
		id: 1042
	},
	{
		name: "Texas",
		id: 1043
	},
	{
		name: "Utah",
		id: 1044
	},
	{
		name: "Vermont",
		id: 1045
	},
	{
		name: "Virginia",
		id: 1046
	},
	{
		name: "Washington",
		id: 1047
	},
	{
		name: "West Virginia",
		id: 1048
	},
	{
		name: "Wisconsin",
		id: 1049
	},
	{
		name: "Wyoming",
		id: 1050
	},
]

export function CreateGroup() {
	const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState([]);
	const [members, setMembers] = useState([]);
	const [member, setMember] = useState("");

	const getNameById = (value, list) => {
		var i, len = list.length;

		for (i = 0; i < len; i++) {
			if (list[i] && list[i]["id"] == value) {
				return list[i]["name"];
			}
		}

		return -1;
	}

	const deleteMember = (value) => {
		setMembers(oldMembers => {
			return oldMembers.filter(member => member !== value)
		})
	}

	const submitData = () => {
		if (title === '' || currency === '' || members.length === 0) {
			Alert.alert("Please fill all the fields.");
		}
		else if(members.length === 1) {
			Alert.alert("Two members are required to create a group.")
		}
		else {
			let currencyKey = getNameById(currency[0], currencyList);

		// 	try {
		// 		const profile = {
		// 			gender: gender,
		// 			dob: text,
		// 			categories: categories,
		// 			location: userLocation
		// 		}
		// 		console.log("category", profile);
		// 		await AsyncStorage.mergeItem('UserData', JSON.stringify(profile));

		// 		// To check local storage data
		// 		AsyncStorage.getItem('UserData')
		// 			.then(value => {
		// 				// console.log("value", value);
		// 				//console.log("check",JSON.parse(value).email_verified);
		// 				navigation.navigate("InstagramLogin")
		// 			})


		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		}
	}

	return (
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
					uniqueKey='id'
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
								Alert.alert("Warning", "This member has already been added");
							}
							else {
								members.push(member); 
							}							
							setMember('')
						}}
					/>
				</View>

				<View style={{flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'flex-start'}}>
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
										size: 15,
										color: '#D3D3D3',
										onPress: () => {deleteMember(member)}
									}}
									iconRight
									containerStyle={{ 
										marginHorizontal: 5,
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
			</SafeAreaView>

		</View>
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