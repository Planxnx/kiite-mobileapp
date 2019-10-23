import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Button } from 'react-native';

export default class MainScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    gotoLogin = () => {
        const { navigation } = this.props
        navigation.navigate('Login')
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Kiite
                </Text>
                <Button title="Setting" onPress={this._settingApp} />
            </View>
        );
    }

    _settingApp = () => {
        this.props.navigation.navigate('Setting');
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
