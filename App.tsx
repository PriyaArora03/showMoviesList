/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Routes } from './src/routes/Routes';
import { Provider } from 'react-redux';
import store from './store/store'

import "./translations/i18n"

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
