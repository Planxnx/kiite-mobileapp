import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Button } from 'react-native';
import io from 'socket.io-client';
import FindingComponent from  './components/FindComp'

export default class FindScreen extends React.Component {

    static navigationOptions = {
        title: 'Kiite’s Messenger',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isShow: false,
            queueData: {
                userQueue: 0,
                helperQueue: 0
            }
        }

        
    }

    componentDidMount() {
        this.socket = io('https://cloudarch-ite.appspot.com');
        const { navigation } = this.props
        let userData = navigation.getParam('userData', 'null')
        this.setState({
            userData : userData,
            userType: userData.type
        })
        AsyncStorage.multiGet(['username','token','role']).then((data) => {
          this.setState({
            username:data[0][1],
            token:data[1][1],
            role:data[2][1],
          });
        });
        this.socket.on('queue_chat', (data)=>{
            this.setState({
                queueData : data
            })
        });
        this.socket.emit('find_chat', {
            type: userData.type,
            token: this.state.token
        });
        
        //เปลี่ยนจาก setTimeout เป็ร socket"foundChat"
        setTimeout(()=>{
            this.setState({
                isLoading : false
            })
        }, 2000)
    }

    componentWillUnmount = () => {
        this.socket.disconnect()
    }
    

    render(){
        const { userData,userType,queueData , isLoading} = this.state
        return (
            <View style={styles.container}>
                <Text>
                    {JSON.stringify(userData)}
                </Text>
                { userType == "helper" ? <FindingComponent userInQueue = {queueData.helperQueue} isLoading = {isLoading} /> :
                    <FindingComponent userInQueue = {queueData.userQueue} isLoading = {isLoading} />
                }
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
