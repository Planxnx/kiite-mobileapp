import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

export default class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    _bootstrapAsync = async () => {
      const token = await AsyncStorage.getItem('token');
      setTimeout(() => {
        this.props.navigation.navigate(token ? 'App' : 'Auth');
      }, 0);
    };
  
    render() {
      return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5fcff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize: 20,
        textAlign: "center"
    }
});