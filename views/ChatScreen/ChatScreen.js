import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Button } from 'react-native';

export default class SettingScreen extends React.Component {

    static navigationOptions = {
        title: 'Kiite’s Messenger',
    };

    gotoLogin = () => {
        const { navigation } = this.props
        navigation.navigate('Login')
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    Chat
                </Text>
            </View>
        );
    }
    
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    };
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
