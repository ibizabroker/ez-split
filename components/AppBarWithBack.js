import * as React from "react";
import { Header } from "@rneui/base";
import { Text, StyleSheet } from "react-native";
import { useNavigation, StackActions } from '@react-navigation/native';
import { RFValue } from "react-native-responsive-fontsize";

export default function AppBarWithBack(props) {
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

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
      leftComponent={{
        icon: 'arrow-back-ios', 
        color: '#FFFFFF',
        size: 26,
        onPress: () => {
          navigation.dispatch(popAction);
        }
      }}
      leftContainerStyle={{
        justifyContent: 'center',
        left: 8
      }}
    />
  );
}

const styles = StyleSheet.create({
  ez: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: RFValue(24.5),
    color:'#FC4949'
  },
  split: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: RFValue(24.5),
    color:'#D3D3D3'
  }
});