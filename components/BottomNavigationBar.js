import * as React from 'react';
import { BackHandler } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Groups from "../screens/Groups";
import CreateGroup from '../screens/CreateGroup';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function handleBackButton  ()  {
  BackHandler.exitApp();
  return true;
}

function GroupsStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{ title: 'Groups Page' }}
        listeners={{ 
          focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton),
          blur: () => BackHandler.removeEventListener('hardwareBackPress',handleBackButton)
        }}
      />
      {/* <Stack.Screen
        name="Screen 2"
        component={Screen2}
      /> */}
    </Stack.Navigator>
  );
}

function CreateGroupStack() {
  return (
    <Stack.Navigator
      initialRouteName="CreateGroup"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
      />
    </Stack.Navigator>
  );
}

function BottomNavigationBar() {
  return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#D3D3D3',
          tabBarInactiveTintColor: '#808080',
          tabBarActiveBackgroundColor: '#332940',
          tabBarInactiveBackgroundColor: '#332940',
          tabBarHideOnKeyboard: true,
          tabBarStyle:{height: 63}
        }}
        
      >
        <Tab.Screen
          name="GroupsStack"          
          component={GroupsStack}
          options={{
            tabBarLabel: 'Groups',
            tabBarLabelStyle: {fontFamily: 'Montserrat-Medium', fontSize: 11, marginBottom: 10},
            tabBarIconStyle: {marginTop: 10},
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="layer-group" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="CreateGroupStack"
          component={CreateGroupStack}
          options={{
            tabBarLabel: 'Create Group',
            tabBarLabelStyle: {fontFamily: 'Montserrat-Medium', fontSize: 11, marginBottom: 10},
            tabBarIconStyle: {marginTop: 10},
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="plus-circle" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>    
  );
}

export default BottomNavigationBar;