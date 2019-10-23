import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AppNavigator from './Navigator/AppNavigator'
import AuthNavigator from './Navigator/AuthNavigator'

import AuthLoadingScreen from './components/AuthLoading'

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default App;