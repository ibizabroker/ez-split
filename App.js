import BottomNavigationBar from './components/BottomNavigationBar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

function App() {
  function handleBackButton(){
    BackHandler.exitApp();
    return true;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >

      <Stack.Screen name="BottomNavigationBar" component={BottomNavigationBar} />
      
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