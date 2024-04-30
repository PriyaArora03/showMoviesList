import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './../../../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'
import { LoginScreenNavigationProp } from '../../../type';
import { setLanguage } from '../../../store/languageSlice';
import i18next from 'i18next';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [enable, setEnable] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { t, i18n } = useTranslation()

  const languages = [
    { label: t("english"), value: 'en' },
    { label: t("arabic"), value: 'ab' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(null);


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 ;
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

  const changeLanguage = (language: string ) => {
    dispatch(setLanguage(language));
  };


  return (
    <><View style={styles.container}>
      <Text style={styles.loginText}>{t("login")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        testID="emailInput" />
      <TextInput
        style={{ ...styles.input, marginBottom: 20 }}
        placeholder={t("password")}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        testID="passwordInput" />
      <Button
        title={t("login")}
        disabled={!validateEmail(email) || !validatePassword(password)}
        onPress={handleLogin}
        testID="loginButton" />
    </View>
      <View style={styles.lang}>
        <Text style={styles.sTitle1}> {t('language')}</Text>
        <Text style={styles.sTitle2}>{t('select')} </Text>

        <FlatList
          data={languages}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedLanguage(item.value);
              }}
              style={selectedLanguage === item.value
                ? styles.selectedLanguage
                : styles.language}>
              <Text
                style={selectedLanguage === item.value
                  ? styles.selectedText
                  : styles.text}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )} />

        <View style={styles.btns}>
          <TouchableOpacity
            onPress={() => {
              i18next.changeLanguage(selectedLanguage)
              changeLanguage(selectedLanguage)
              console.log("setting language after button press", selectedLanguage)
              
            }}
            style={{
              width: 150,
              height: 48,
              borderWidth: 0.5,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2352D8',
            }}>
            <Text
              style={{
                color: '#F7F9FA',
                fontFamily: 'Manrope',
                fontStyle: 'normal',
              }}>
              {t('save')}
            </Text>
          </TouchableOpacity>
        </View>
      </View></>
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
    paddingBottom: 20,
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
    color: 'white',
  },
  lang: {
    width: '90%',
    marginHorizontal: "5%",
    backgroundColor: '#FFFFFF',
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#E9EDF2',
    borderRadius: 16,
    borderStyle: 'solid',
  },
  sTitle1: {
    paddingTop: 34,
    fontStyle: 'normal',
    paddingLeft: 10,
    paddingRight:10,
    fontSize: 14,
    color: '#A8B4BF',
  },
  sTitle2: {
    paddingTop: 20,
    paddingBottom: 20,
    fontStyle: 'normal',
    paddingLeft: 10,
    paddingRight:10,
    fontSize: 12,

    color: '#576573',
  },
  languageItem: {
    height: 50,

    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
  texts: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    color: '#576573',

    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
  btns: {
    flexDirection: 'row',

    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  language: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedLanguage: {
    padding: 10,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 14,
    color: '#576573',
  },
  selectedText: {
    fontSize: 14,
    color: '#24A0ED',
    fontWeight: 'bold',
  },
});

export default Login;