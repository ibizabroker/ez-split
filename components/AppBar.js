import { Appbar } from "react-native-paper";
import { Text, StyleSheet } from "react-native";

export default function AppBar(props) {
  return (
    <Appbar.Header mode='center-aligned' style={{backgroundColor: '#121212'}} >
      <Appbar.Content 
        title={
          <Text style={styles.you} >
            {props.you}
            <Text style={styles.fluence} >
              {props.fluence}
            </Text>
          </Text>
        } 
      />
    </Appbar.Header>
  )  
}

const styles = StyleSheet.create({
  you: {
    // fontFamily: 'Party-Confetti',
    fontSize: 26,
    color:'#FFFFFF'
  },
  fluence: {
    // fontFamily: 'Party-Confetti',
    fontSize: 26,
    color:'#F0F0F0'
  }
});
