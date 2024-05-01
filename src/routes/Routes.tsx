import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from '../screens/LoginPage/Login';
import Movies from '../screens/MoviesPage/Movies'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreenNavigationProp, LoginStackNavigatorParamList } from '../../type';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Button } from 'react-native';
import { logout } from "../../store/authSlice"


const Stack = createNativeStackNavigator<LoginStackNavigatorParamList>();


const AppStack = () => {
  const { t, i18n } = useTranslation()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const lang = useSelector((state: RootState) => state.language.language)

  const dispatch = useDispatch()
  const navigation = useNavigation<LoginScreenNavigationProp>();

  console.log('in Routes lang is*******', lang)

  const handleLogout = () => {
    dispatch(logout())
    navigation.navigate("Login")
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <><Stack.Screen
          name="Movies"
          component={Movies}
          options={{
            title: t("movies"),
            headerRight: () => (
              <Button
                title= {t("signout")}
                onPress={() => handleLogout()} />
            ),
          }} /><Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false
            }} /></>
      ) : (
        <>
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
              title: t("movies"),
              headerRight: () => (
                <Button
                  title="Sign out"
                  onPress={() => handleLogout()}
                />
              ),
            }} />
        </>
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