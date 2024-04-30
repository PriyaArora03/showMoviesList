import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './../../../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'
import { LoginScreenNavigationProp } from '../../../type';
import { setLanguage } from '../../../store/languageSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [enable, setEnable] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { t, i18n } = useTranslation()

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

  const changeLanguage = (language: string) => {
    dispatch(setLanguage(language));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>{t("login")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        testID="emailInput"
      />
      <TextInput
        style={{ ...styles.input, marginBottom: 30 }}
        placeholder={t("password")}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        testID="passwordInput"
      />
      <Button
        title={t("login")}
        disabled={!validateEmail(email) || !validatePassword(password)}
        onPress={handleLogin}
        testID="loginButton" />
      {/* <TouchableOpacity
        style={styles.languageButton}
        onPress={handleLogin}
        disabled={!validateEmail(email) || !validatePassword(password)}>
        <Text style={styles.languageButtonText}>{t("login")}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={{...styles.languageButton,  marginTop: 100}}
        onPress={() => changeLanguage('en')}  >
        <Text style={styles.languageButtonText}>{t("english")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.languageButton,  marginTop: 20}}
        onPress={() => changeLanguage('ab')}  >
        <Text style={styles.languageButtonText}>{t("arabic")}</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "white"
  },
  loginText: {
    fontSize: 24,
    paddingBottom: 30,
    fontFamily: 'bold',
    color: 'black'
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'grey',
  },
  languageButton: {
    backgroundColor: '#24A0ED',
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  languageButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: 'bold',
    color: 'white',
  }
});

export default Login;