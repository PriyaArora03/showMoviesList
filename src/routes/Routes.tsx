import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/LoginPage/Login';
import Movies from '../screens/MoviesPage/Movies'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackNavigatorParamList } from '../../type';
import { useTranslation } from 'react-i18next'

const Stack = createNativeStackNavigator<LoginStackNavigatorParamList>();


const AppStack = () => {
  const { t, i18n } = useTranslation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{
          title: t("movies")
        }} />
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