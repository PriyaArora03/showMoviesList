import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/LoginPage/Login';
import Movies from '../screens/MoviesPage/Movies'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackNavigatorParamList } from '../../type';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Stack = createNativeStackNavigator<LoginStackNavigatorParamList>();


const AppStack = () => {
  const { t, i18n } = useTranslation()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token);

  console.log('isLoggedin***********', isLoggedIn)
  console.log('token***********', token)

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Movies"
          component={Movies}
          options={{
            title: t("movies")
          }} />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }} />
      )}
    </Stack.Navigator>
  )
}



export const Routes = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}