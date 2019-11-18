import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainNavigator from './Navigator/MainNavigator'
import AuthNavigator from './Navigator/AuthNavigator'

import AuthLoadingScreen from './components/AuthLoading'

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
      headerMode: 'none'
    }
  )
);

export default App;