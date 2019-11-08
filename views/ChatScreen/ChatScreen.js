import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Button } from 'react-native';

export default class ChatScreen extends React.Component {

    static navigationOptions = {
        title: 'Kiite’s Messenger',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        } 
    }

    componentDidMount() {
        const { navigation } = this.props
        this.socket = navigation.getParam('socket', 'null')
    }

    gotoLogin = () => {
        const { navigation } = this.props
        navigation.navigate('Login')
    }

    componentWillUnmount = () => {
        this.socket.disconnect()
    }

    render(){
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Text>
                    ChatScreen
                </Text>
                <Text>
                    User Data:
                    {JSON.stringify(navigation.getParam('userData', 'null'))}
                </Text>
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
