import * as React from 'react';
import { Login } from './pages/login'
import { SignUp } from './pages/signup';
import { Websites } from './pages/websites';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './state/reducer';

const client = axios.create({
  baseURL: 'https://dev.people.com.ai/mobile/api/v2',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  Websites: { screen: Websites}
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
