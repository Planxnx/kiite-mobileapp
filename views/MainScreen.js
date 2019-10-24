import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Button } from 'react-native';

export default class MainScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "token",
            passwordInput: "",
            isLoading: false,
        };
    }

    componentDidMount() {
        AsyncStorage.multiGet(['username','token','role']).then((data) => {
          this.setState({
            username:data[0][1],
            token:data[1][1],
            role:data[2][1]
          });
        });
    }

    static navigationOptions = {
        header: null,
    };

    gotoLogin = () => {
        const { navigation } = this.props
        navigation.navigate('Login')
    }

    render(){
        const { username,role,token } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Kiite
                </Text>
                <Text style={styles.text}>
                    username: {username}
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
