import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Button } from 'react-native';
import io from 'socket.io-client';

export default class FindScreen extends React.Component {

    static navigationOptions = {
        title: 'Kiite’s Messenger',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }

        
    }

    componentDidMount() {
        this.socket = io('https://cloudarch-ite.appspot.com');
        const { navigation } = this.props
        let userData = navigation.getParam('userData', 'null')

        AsyncStorage.multiGet(['username','token','role']).then((data) => {
          this.setState({
            username:data[0][1],
            token:data[1][1],
            role:data[2][1]
          });
        });

        this.socket.emit('find_chat', {
            type: userData.type,
            token: this.state.token
        });
    }

    componentWillUnmount = () => {
        this.socket.disconnect()
    }

    render(){
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Text>
                    FindScreen
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
    backgroundColor: '#2FC4B2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
      fontSize: 20,
      textAlign: "center"
  }
});
