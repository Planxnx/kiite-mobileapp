import React from 'react';
import { Alert,Platform,StyleSheet, Text, View ,ScrollView,TouchableWithoutFeedback ,KeyboardAvoidingView,TextInput,Image,TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import OverallMood from  '../../components/OverallMood'
import MessageBox from  './components/Messsage'

export default class ChatScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        const chatData = navigation.getParam('chatData', 'null')
        return {
            title: chatData.matchName ,
            headerLeft : () => (
                <TouchableWithoutFeedback 
                  onPress={()=>{navigation.goBack()}}
                  style={{marginLeft:10}}
                >
                    <View style={{justifyContent:'center',flexDirection: 'row',alignItems: 'center'}}>
                        <Icon name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-round-back'} size={vh(4.2)} color="#f8f8f8" style={{marginLeft:vh(1.49)}} />
                        <Text style={{fontSize:vh(2.3988),color:"#f8f8f8"}}> Exit </Text>
                    </View>
                </TouchableWithoutFeedback >
              )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            disconnected: false,
            message:[
                {
                    user: 'matcher',
                    text: 'สวัสดีหน้าหี',
                    mood: 'pos',
                    time: '22:00',
                }
            ]
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        this.setState({
            chatData: navigation.getParam('chatData','null')
        })
        this.socket = navigation.getParam('socket', 'null')
        this.socket.on('receive_chat', (data)=>{
            let today = new Date() 
            let time = today.getHours() + ":" + today.getMinutes()
            let messageData = {
                user: 'matcher',
                text: data.text,
                mood: data.mood,
                time: time
            }
            this.setState({
                message: [...this.state.message, messageData]
            })
        });
        this.socket.on('end_chat', (data)=>{
            this.setState({
                disconnected: true
            })
            Alert.alert(
                data,
                'กดออก',
                [
                  {text: 'OK',
                  onPress: () => {
                    this.props.navigation.navigate('TypeScreen')
                    this.componentWillUnmount()
                  }},
                ],
              )
        });
    }
    
    sendMessage = () => {
        let today = new Date() 
        let time = today.getHours() + ":" + today.getMinutes()
        let messageData = {
            user: 'user',
            text: this.state.messageInput,
            time: time
        }
        this.setState({ 
            message: [...this.state.message, messageData],
            messageInput: "" 
        })
        this.socket.emit('send_chat', {
            username: this.state.username,
            topic: this.state.chatData.topic,
            room: this.state.chatData.room,
            text: this.state.messageInput
        });

    }

    componentWillUnmount = () => {
        this.socket.disconnect()
    }

    findOverallMoodPercent = () => {
        let posCount = 0
        let negCount = 0
        this.state.message.map((data,key)=>{
            if(data.mood == 'pos'){
                posCount += 1
            }else if (data.mood == 'neg'){
                negCount += 1
            }
        })
        return {
            posPercent: posCount/(posCount+negCount)*100,
            negPercent: negCount/(posCount+negCount)*100
        }
    }

    render(){
        let MessageBoxes =  this.state.message.map((data,key)=>{
            return <MessageBox key={key} user = {data.user} text={data.text} time={data.time}  />
        })
        let moodPercent = this.findOverallMoodPercent()
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView 
                    style={styles.keyboardAvoidContainer}  
                    behavior="padding"
                    keyboardVerticalOffset={vh(8.99550)} 
                    enabled 
                >
                    <OverallMood posPercent={moodPercent.posPercent} negPercent={moodPercent.negPercent} />
                    <ScrollView>
                        {MessageBoxes}
                    </ScrollView>
                    <View style={styles.messageInput}>
                        <TouchableOpacity
                            onPress={()=>{}}
                        >
                            <Image
                                style={styles.imgMic}
                                source={require('./assets/mic.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.textInputBox} >
                            <TextInput 
                                style={styles.textInput}
                                returnKeyType='none'
                                multiline={true}
                                onChangeText={messageInput => {
                                    this.setState({ messageInput });
                                }}
                                value={this.state.messageInput}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonInput}
                            onPress={()=>{this.sendMessage()}}
                        >
                            <Text>
                                Send
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  text:{
      fontSize: 20,
      textAlign: "center"
  },
  messageInput:{
      minHeight: vh(7),
      maxHeight:vh(40),
      width: vh(56.221889),
      backgroundColor: '#2FC4B2',
      flexDirection: 'row',
      alignItems: 'center'
  },
  textInputBox:{
    width: vh(37.1814),
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight:vw(6.5),
    maxHeight:vh(40.5),
    borderRadius:vh(0.89955),
  },
  textInput:{
    width:vh(35),
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgMic:{
    width:vh(1.94),
    height: vh(3.148425),
    marginHorizontal: vh(2.248875),
  },
  buttonInput:{
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: vh(1),
    marginHorizontal: vh(2.248875),
    borderRadius:vh(0.89955),
  }
});
