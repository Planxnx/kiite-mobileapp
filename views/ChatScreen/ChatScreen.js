import React from 'react';
import { Alert,Platform,StyleSheet, Text,Keyboard, View ,ScrollView,TouchableWithoutFeedback ,KeyboardAvoidingView,TextInput,AsyncStorage,TouchableOpacity,Image,SafeAreaView  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-navigation';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import OverallMood from  '../../components/OverallMood'
import MessageBox from  './components/Messsage'

const stickerList = [
    {
        title: 'รักน้า',
        mood: 'รักน้า',
        src: 'https://www.img.in.th/images/17b2813d9be48bcb734bf0f72276f29e.png',
    },{
        title: 'มิตรภาพ',
        mood: 'มิตรภาพ',
        src: 'https://www.img.in.th/images/2cba499581319637c882dc648401bd3c.png',
    },{
        title: 'เงียบไปเลยย',
        mood: 'เงียบไปเลยย',
        src: 'http://img.in.th/images/f38645384b53bd328fcb917093b2d8d3.png',
    },{
        title: 'จับมือ',
        mood: 'จับมือ',
        src: 'https://www.img.in.th/images/a4eb9518ebf72e9fd2fff6429325dadc.png',
    },{
        title: 'กอดกันนะ',
        mood: 'กอดกันนะ',
        src: 'https://www.img.in.th/images/b11831fc07e45677096629846eda51a9.png',
    },{
        title: '5555',
        mood: '5555',
        src: 'https://www.img.in.th/images/61121fbfea2aebdd5d395bb732a89d1b.png',
    },{
        title: 'ฟังอยู่นะ',
        mood: 'ฟังอยู่นะ',
        src: 'http://img.in.th/images/c6af8757552b91c28657ee2ebdcdc1be.png',
    }
]
export default class ChatScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        const chatData = navigation.getParam('chatData', 'null')
        return {
            title: chatData.matchName ,
            headerLeft : () => (
                <TouchableWithoutFeedback 
                  onPress={()=>{navigation.pop(3)}}
                  style={{marginLeft:10}}
                >
                    <View style={{justifyContent:'center',flexDirection: 'row',alignItems: 'center'}}>
                        <Icon name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'ios-arrow-back'} size={vh(4.2)} color="#f8f8f8" style={{marginLeft:vh(1.49)}} />
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
            message:[],
            messageEmpty:true,
            stickerBox: false,
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        AsyncStorage.multiGet(['username','token','role']).then((data) => {
            this.setState({
              username:data[0][1],
              token:data[1][1],
              role:data[2][1]
            });
        });
        this.setState({
            chatData: navigation.getParam('chatData','null')
        })
        this.socket = navigation.getParam('socket', 'null')
        this.socket.on('receive_chat', (data)=>{
            function checkTime(i) {
                return (i < 10) ? "0" + i : i;
            }
            let today = new Date() 
            let time = checkTime(today.getHours()) + ":" + checkTime(today.getMinutes())
            let messageData = {
                user: 'matcher',
                text: data.text,
                mood: data.mood,
                type: data.type,
                src: data.src,
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
                '',
                'Your stranger has been disconnected',
                [
                  {text: 'OK',
                  onPress: () => {
                    this.props.navigation.pop(3)
                    this.componentWillUnmount()
                  }},
                ],
              )
        });
    }
    
    textEmpty = (text) =>{
        if(text == ""){
            return true
        }else{
            return false
        }
    }

    sendMessage = () => {
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }
        let today = new Date() 
        let time = checkTime(today.getHours()) + ":" + checkTime(today.getMinutes())
        let messageData = {
            user: 'user',
            text: this.state.messageInput,
            time: time,
            type: 'text'
        }
        this.setState({ 
            message: [...this.state.message, messageData],
            messageInput: "" 
        })
        this.socket.emit('send_chat', {
            username: this.state.username,
            topic: this.state.chatData.topic,
            room: this.state.chatData.room,
            text: this.state.messageInput,
            type: 'text'
        });

    }

    sendSticker = (mood,src) => {
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }
        let today = new Date() 
        let time = checkTime(today.getHours()) + ":" + checkTime(today.getMinutes())
        let messageData = {
            user: 'user',
            type: 'sticker',
            text: mood,
            time: time,
            src: src
        }
        this.setState({ 
            message: [...this.state.message, messageData],
        })
        this.socket.emit('send_chat', {
            username: this.state.username,
            topic: this.state.chatData.topic,
            room: this.state.chatData.room,
            text: mood,
            src: src,
            type: 'sticker'
        });

    }

    stickerSwitch = () => {
        switch (this.state.stickerBox) {
            case true:
                this.setState({ 
                    stickerBox: false
                });
                break;
        
            default:
                Keyboard.dismiss()
                this.setState({ 
                    stickerBox: true
                });
                break;
        }
    }

    stickersRow = () =>{
        return stickerList.map((sticker,i)=>{
            return(
                    <TouchableOpacity
                        onPress={()=>{this.sendSticker(sticker.mood,sticker.src)}}
                        key={i}
                    >
                        <Image
                            style={{
                                width: vw(25),
                                height: vw(25),
                                marginVertical: vw(5),
                                marginHorizontal: vw(7)
                            }}
                            source={{uri:sticker.src}}
                        />
                    </TouchableOpacity>
                )
            })
    }

    stickerBox = () => {
        return (
            <SafeAreaView>
                <ScrollView horizontal={true}>
                    {this.stickersRow()}
                </ScrollView>
            </SafeAreaView>
        )
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

    componentWillUnmount = () => {
        this.socket.disconnect()
    }


    render(){
        let MessageBoxes =  this.state.message.map((data,key)=>{
            return <MessageBox key={key} user = {data.user} text={data.text} time={data.time} type={data.type} src={data.src} />
        })
        let moodPercent = this.findOverallMoodPercent()
        return (
            <View style={styles.container}>
                <OverallMood posPercent={moodPercent.posPercent} negPercent={moodPercent.negPercent} />
                <KeyboardAvoidingView 
                    style={styles.keyboardAvoidContainer}  
                    behavior="padding"
                    keyboardVerticalOffset={Platform.select({ios: vh(10), android: vh(12)})} 
                    enabled 
                >
                    <ScrollView
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight)=>{        
                            this.scrollView.scrollToEnd({animated: true});
                        }}
                    >
                        {MessageBoxes}
                    </ScrollView>
                    <View style={styles.messageInput}>
                        <View style={styles.textInputBox} >
                            <TextInput 
                                style={styles.textInput}
                                onTouchStart={()=>this.stickerSwitch()}
                                multiline={true}
                                onChangeText={messageInput => {
                                    this.setState({ 
                                        messageInput:messageInput,
                                        messageEmpty: this.textEmpty(messageInput.trim())
                                    });
                                }}
                                value={this.state.messageInput}
                            />
                            <TouchableOpacity
                                onPress={()=>{
                                    this.stickerSwitch()
                                }}
                            >
                                <Image
                                    style={{
                                        width: vw(6),
                                        height: vw(6),
                                        marginHorizontal: vw(1)
                                    }}
                                    source={this.state.stickerBox ? require('./assets/stickerOnclickIcon.png') : require('./assets/stickerIcon.png') }
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={this.state.messageEmpty ? styles.buttonInputDisable : styles.buttonInput}
                            onPress={()=>{
                                this.sendMessage()
                                this.setState({ 
                                    messageEmpty: true
                                });
                            }}
                            disabled={this.state.messageEmpty}
                        >
                            <Text 
                                 style={this.state.messageEmpty ? {color: "#EFEFEF"} : {color: "#000000"}}
                            >
                                Send!
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.state.stickerBox ? this.stickerBox() : <View></View>}
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
    // alignItems: 'center',
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
      width: vw(100),
      backgroundColor: '#2FC4B2',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: vh(1.2)
  },
  textInputBox:{
    width: vw(80),
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight:vw(6.5),
    maxHeight:vh(40.5),
    borderRadius:vh(0.89955),
  },
  textInput:{
    width:vw(70),
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInput:{
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: vh(0.88),
    marginHorizontal: vh(0.5),
    borderRadius:vh(0.89955),
  },
  buttonInputDisable:{
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: vh(0.88),
    marginHorizontal: vh(0.5),
    borderRadius:vh(0.89955),
    color: '#E9E9E9'
  }
});
