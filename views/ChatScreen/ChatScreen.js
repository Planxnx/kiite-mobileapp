import React from 'react';
import { Platform,StyleSheet, Text, View ,ScrollView,TouchableWithoutFeedback ,KeyboardAvoidingView,TextInput,Image,TouchableOpacity  } from 'react-native';
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
                    mood: 'pos'
                },{
                    user: 'user',
                    text: 'สวัสดีจ้า',
                    mood: 'pos'
                },{
                    user: 'user',
                    text: 'รู้สึกแย่จังเลย',
                    mood: 'neg'
                },{
                    user: 'matcher',    
                    text: 'This method has the advantage of fonts being copied from this module at build time so that the fonts and JS are always in sync, making upgrades painless.',
                    mood: 'pos'
                }
            ]
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

    sendMessage = () => {
        let messageData = {
            user: 'user',
            text: this.state.messageInput,
        }
        this.setState({ 
            message: [...this.state.message, messageData] 
        })
    }

    componentWillUnmount = () => {
        // this.socket.disconnect()
    }

    render(){
        let MessageBoxes =  this.state.message.map((data,key)=>{
            return <MessageBox user = {data.user} text={data.text}  />
        })
        
        return (
            <View style={styles.container}>
                <OverallMood posPercent={0} negPercent={0} />
                <ScrollView>
                    {MessageBoxes}
                </ScrollView>
                <KeyboardAvoidingView style={styles.messageInput} behavior="padding" enabled>
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
  text:{
      fontSize: 20,
      textAlign: "center"
  },
  messageInput:{
      bottom:vh(50),
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
