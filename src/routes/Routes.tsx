import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/LoginPage/Login';
import Movies from '../screens/MoviesPage/Movies'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackNavigatorParamList } from '../../type';

const Stack = createNativeStackNavigator<LoginStackNavigatorParamList>();


const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Movies" component = {Movies} />
    </Stack.Navigator>
  )
}

export const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}