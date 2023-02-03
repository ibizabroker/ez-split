import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import React from 'react'
import { ListItem, Divider } from '@rneui/themed';
import { onCapture } from './Balances';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { RFValue } from "react-native-responsive-fontsize";

export default function Export(props) {
  const group = props.group;
  const jsonForExcel = props.jsonForExcel;

  const generateExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsonForExcel);
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");
    const file = XLSX.write(wb, { type: "base64", bookType: 'xlsx' });
    if (Platform.OS === "ios") {
      const filename = FileSystem.documentDirectory + `Expenses.xlsx`;
      FileSystem.writeAsStringAsync(filename, file, {
        encoding: FileSystem.EncodingType.Base64
      }).then(() => {
        Sharing.shareAsync(filename);
      });
    }
    else {
      const filename = FileSystem.documentDirectory + `${group.title} Expenses.xlsx`;
      FileSystem.writeAsStringAsync(filename, file, {
        encoding: FileSystem.EncodingType.Base64
      }).then(() => {
        Sharing.shareAsync(filename);
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={styles.heading}>{group.title}</Text>
        <Divider width={2.2} color='#332940' />
        <ListItem
          containerStyle={{
            backgroundColor: '#121212',
            borderBottomWidth: 2,
            borderBottomColor: '#332940',
          }}
          onPress={() => onCapture(this.captureBalances)}
        >
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontFamily: 'Montserrat',
                fontSize: RFValue(12.5),
                color: '#D3D3D3',
                padding: 8,
                marginLeft: '5%'
              }}
            >
              PNG
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          containerStyle={{
            backgroundColor: '#121212',
            borderBottomWidth: 2,
            borderBottomColor: '#332940',
          }}
          onPress={generateExcel}
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
            >
              Excel
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </ScrollView>
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
});