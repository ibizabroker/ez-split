import { Appbar } from "react-native-paper";
import { Text, StyleSheet } from "react-native";

export default function AppBar(props) {
  return (
    <Appbar.Header mode='center-aligned' style={{backgroundColor: '#332940'}} >
      <Appbar.Content 
        title={
          <Text style={styles.ez} >
            {props.ez}
            <Text style={styles.split} >
              {props.split}
            </Text>
          </Text>
        } 
      />
    </Appbar.Header>
  )  
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
