import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBar from '../components/AppBar';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ListItem, Dialog } from '@rneui/themed';
import { RFValue } from "react-native-responsive-fontsize";

const Groups = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

	const [groups, setGroups] = useState([]);
  const [deleteKey, setDeleteKey] = useState('');
  const [deleteValue, setDeleteValue] = useState({});
	const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
		setVisible(!visible);
	};

  const fetchData = async () => {
     await AsyncStorage.getItem('Groups')
      .then(value => {
        let groupsFetch = JSON.parse(value);
        setGroups(groupsFetch);
    })
  }

  useEffect(() => {
    if(isFocused) {
      fetchData();
    }
  }, [isFocused])

  const removeJSON = async (key, value) => {
    try {
        const jsonArray = await AsyncStorage.getItem('Groups');
        let parsedArray = JSON.parse(jsonArray);
        parsedArray = parsedArray.filter(item => !(item.title === value.title));

        await AsyncStorage.setItem('Groups', JSON.stringify(parsedArray));
        await AsyncStorage.removeItem(key);

        fetchData();
        toggleDialog();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <View style={styles.containerInitial}>
        <AppBar ez={'EZ '} split={'Split'} />

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {groups === null 
            ? 
              <View style={styles.container}>
                <Text style={styles.noGroupsText}>You don't have any groups yet. Go to the Create Group tab to add a group.</Text>
              </View>
            :              
              groups.map((item) => {
                return (
                  <ListItem
                    key={item.title}
                    containerStyle={{
                      backgroundColor: '#121212',
                      borderBottomWidth: 2,
                      borderBottomColor: '#332940',
                    }}
                    onPress={() => {
                      // console.log(item.title)
                      navigation.navigate("GroupTabs", {group: item});               
                    }}
                    onLongPress={() => {
                      setDeleteKey(item.title);
                      setDeleteValue(item);
                      toggleDialog();              
                    }}
                  >
                    <ListItem.Content>
                      <ListItem.Title
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: RFValue(14.5),
                          color: '#D3D3D3',
                          padding: 8,
                          marginLeft: '5%'
                        }}
                      >{item.title}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )
              })       
          } 
        </ScrollView>  

        <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}
          overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
        >
          <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(16.5), marginBottom: 10, color: '#D3D3D3'}}>Delete?</Text>
          <Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Are you sure you want to delete this group?</Text>
          <Dialog.Actions>
            <Dialog.Button title="No, go back" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog()}/>
            <Dialog.Button title="Yes" titleStyle={{fontFamily: 'Montserrat-Medium', color: 'red'}} onPress={() => {removeJSON(deleteKey, deleteValue)}}/>
          </Dialog.Actions>
        </Dialog>

      </View>
  )
}

export default Groups

const styles = StyleSheet.create({
  containerInitial: {
    flex: 1,
    backgroundColor: '#121212'
  },
  container: {
    flex: 1,
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noGroupsText: {
    fontFamily: 'Montserrat',
    fontSize: RFValue(14.5),
    color: '#D3D3D3',
    textAlign: 'center'
  }
});
