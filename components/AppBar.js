import * as React from "react";
import { Header } from "@rneui/base";
import { Text, StyleSheet } from "react-native";

export default function AppBar(props) {
  return (
    <Header
      backgroundColor="#332940"
      barStyle="default"
      centerComponent={
        <Text style={styles.ez} >
          {props.ez}
          <Text style={styles.split} >
            {props.split}
          </Text>
        </Text>
      }
      centerContainerStyle={{ padding: 5 }}
      containerStyle={{ borderBottomWidth: 0 }}
      placement="center"
    />
  );
}

const styles = StyleSheet.create({
  ez: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 26,
    color:'#FC4949'
  },
  split: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 26,
    color:'#D3D3D3'
  }
});