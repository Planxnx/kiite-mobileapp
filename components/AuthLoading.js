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
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const token = await AsyncStorage.getItem('token');
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setTimeout(() => {
        this.props.navigation.navigate(token ? 'App' : 'Auth');
      }, 0);
      
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Kiite
            </Text>
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