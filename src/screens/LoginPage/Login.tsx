import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './../../../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import Movies from '../MoviesPage/Movies';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  const handleLogin = () => {
    if (email === 'testuser@gmail.com' && password === 'password123') {
        dispatch(loginSuccess('fake-token'));
        console.log("sucess")
        navigation.navigate("Movies", {
            args
        })
      } else {
        dispatch(loginFailure('Invalid username or password'));
        console.log("fail")
      }
    console.log("button pressed")
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        testID="emailInput"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        testID="passwordInput"
      />
      <Button title="Login" onPress={handleLogin} testID="loginButton" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      width: '100%',
      marginVertical: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
    },
  });

export default Login;