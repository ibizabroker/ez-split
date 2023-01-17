import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBar from '../components/AppBar';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';

const Groups = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

	const [groups, setGroups] = useState([]);

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
                  >
                    <ListItem.Content>
                      <ListItem.Title
                        style={{
                          fontFamily: 'Montserrat',
                          fontSize: 16,
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
    fontSize: 16,
    color: '#D3D3D3',
    textAlign: 'center'
  }
});
