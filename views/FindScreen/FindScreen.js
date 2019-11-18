import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Button } from 'react-native';
import io from 'socket.io-client';
import FindingComponent from  './components/FindComp'
import ShowStatComponent from  './components/ShowStat'
import { vh } from 'react-native-expo-viewport-units';

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
            userType: userData.type,
            topic: userData.topic,
        })
        AsyncStorage.multiGet(['username','token','role']).then((data) => {
            this.setState({
                username:data[0][1],
                token:data[1][1],
                role:data[2][1],
            })
            //ต้องรอดึง username ให้เสร็จก่อนถึงจะ  findchat ได้
            this.socket.emit('find_chat', {
                type: userData.type,
                token: this.state.token,
                topic: userData.topic,
                username: this.state.username,
            });
        });

        this.socket.on('queue_chat', (data)=>{
            this.setState({
                queueData : data
            })
        });
        
        this.socket.on('found_chat', (data)=>{
            setTimeout(()=>{
                this.setState({
                    roomID : data.room,
                    matchName: data.matchName,
                    yourName: data.yourName,
                    matcherStat: data.matcherStat,
                    imageSrc: data.imageSrc,
                    isLoading : false
                })
                setTimeout(()=>{
                    this.setState({
                        isShow : true
                    })
                    setTimeout(()=>{
                        data.topic = this.state.topic
                        this.props.navigation.navigate('ChatScreen', {
                            socket: this.socket,
                            chatData: data
                        });
                    }, 3500)
                }, 1200)
            }, 1500)
        });
        //เปลี่ยนจาก setTimeout เป็ร socket"foundChat"
    }

    componentWillUnmount = () => {
        this.socket.disconnect()
    }

    getFindingComp = () => {
        const { userType , queueData , isLoading} = this.state
        switch (userType) {
            case "helper":
                return  <FindingComponent userInQueue = {queueData.helperQueue} isLoading = {isLoading} />
            case "user":
                return <FindingComponent userInQueue = {queueData.userQueue} isLoading = {isLoading} />
        }
    }

    getComponent = () =>{
        const { isShow,matchName,yourName,matcherStat,topic,imageSrc } = this.state
        switch (isShow) {
            case false:
                return  this.getFindingComp()
            case true:
                return <ShowStatComponent statData = {{
                    yourName:yourName,
                    matchName:matchName,
                    matcherStat:matcherStat,
                    topic:topic,
                    imageSrc:imageSrc
                }} />
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {this.getComponent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2FC4B2',
    alignItems: 'center',
    paddingTop:vh(16),
},
  text:{
      fontSize: 20,
      textAlign: "center"
  }
});
