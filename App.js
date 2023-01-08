import useCachedResources from './hooks/UseCachedResources';

import BottomNavigationBar from './components/BottomNavigationBar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >

        <Stack.Screen name="BottomNavigationBar" component={BottomNavigationBar} />
        
      </Stack.Navigator>
    );
  }
}

export default () => {
  return (
    <NavigationContainer>
     <SafeAreaProvider>
        <App />
     </SafeAreaProvider>     
    </NavigationContainer>
  )
}