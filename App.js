import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile';

const Stack = createStackNavigator();

const myoptions ={
  title:"Home",
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"#006aff"
  }
}


function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={
         myoptions
        }
        />
        <Stack.Screen name="Create" component={CreateEmployee} 
         options={{
          ...myoptions,title:"Create Employee"
         }}
        />
        <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          ...myoptions,title:"Profile"
         }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
   
  },
});
