import Home from './screens/Home';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { BackHandler } from 'react-native';

const Stack = createStackNavigator();

function App() {
  function handleBackButton(){
    BackHandler.exitApp();
    return true;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >

      <Stack.Screen 
        name="Home" 
        component={Home} 
        listeners={{ 
          focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton),
          blur: () => BackHandler.removeEventListener('hardwareBackPress',handleBackButton)
        }}
      />
      {/* <Stack.Screen name="SecondScreen" component={SecondScreen} /> */}
      
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
     <PaperProvider>
        <App />
     </PaperProvider>     
    </NavigationContainer>
  )
}