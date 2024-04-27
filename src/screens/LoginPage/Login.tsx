import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './../../../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import Movies from '../MoviesPage/Movies';
import { LoginScreenNavigationProp } from '../../../type';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();



  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };


  const handleLogin = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long.'
      );
      return;
    }

    if (email === 'testuser@gmail.com' && password === 'password123') {
      dispatch(loginSuccess('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDZiNDYzNjFjYWM1ZGMxM2ZmZjdlOWE3ZWEyYTE1MyIsInN1YiI6IjY2MmNmZDVhYTgwNjczMDEyNWU4M2I2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BaQbEgvoHE8uxM5u8Ozf4ysrVJohKjcgOHOgjMBS-x0'));
      navigation.navigate("Movies")
    } else {
      dispatch(loginFailure('Invalid username or password'));
      Alert.alert(
        'Either email or password is incorrect',
        'Please check your email or password'
      );
    }
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
      <Button
        title="Login"
        disabled={!email || !password}
        onPress={handleLogin}
        testID="loginButton" />
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
  button: {
    backgroundColor: 'grey'
  }
});

export default Login;