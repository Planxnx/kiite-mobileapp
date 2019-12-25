import React from 'react';
import { ActivityIndicator,AsyncStorage,StyleSheet, Text, View ,Alert  ,TouchableOpacity,Image } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { TextInput } from 'react-native-gesture-handler';
const config = require('../../config.json')
export default class CreateStatusScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            statusInput: "",
            isLoading: false,
        }
    }

    static navigationOptions = () => ({
        title: 'Create Status',
    })

    componentDidMount() {
        AsyncStorage.multiGet(['username','token','role']).then((data) => {
          this.setState({
            username:data[0][1],
            token:data[1][1],
            role:data[2][1]
          });
        });
    }

    postStatus = () => {
        this.setState({
            isLoading: true
        });

        fetch(`${config.kiiteApi}/timeline`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer '+ this.state.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: this.state.statusInput,
                username: this.state.username,
            }),
        })
        .then(response=>response.json())
        .then(async (responseJson) => {
            if(responseJson.status == 200){
                this.setState({
                    isLoading: false,
                    respData: responseJson
                });
                this.props.navigation.navigate('Timeline');
            }else {
                this.setState({
                    isLoading: false,
                });
                Alert.alert(
                    'Create Status failed',
                    "Something went wrong. Please try again",
                    [
                      {text: 'OK'},
                    ],
                    {cancelable: false},
                )
                return
            }
        }).catch(error=>{
            this.setState({
                isLoading: false,
            });
            Alert.alert(
                'Create Post failed',
                "Something went wrong or Internet Connection problems . Please try again",
                [
                  {text: 'OK'},
                ],
                {cancelable: false},
            )
            return
        })  
    };

    _findMoodCount = async () => {
        let posCount = 0
        let negCount = 0
        for (let i = 0; i < this.state.exmapleResp.data.length; i++){
            if (this.state.exmapleResp.data[i].mood == "pos"){
                posCount +=1
            }else{
                negCount +=1
            }
        }
        posCount = posCount/(posCount+negCount)*100
        await AsyncStorage.setItem('posCount', posCount.toString());
    }

    render(){

        return (
            <View style={styles.container}>
                <View style={styles.textInputBox}>
                    <Image
                        style={styles.imgInput}
                        source={require('../TimelineScreen/assets/user.png')}
                    />
                    <TextInput 
                        style={styles.textInput}
                        placeholder="What’s happening?"
                        multiline={true}
                        maxLength = {250}
                        keyboardType='email-address'
                        onChangeText={statusInput => {
                            this.setState({ statusInput });
                        }}
                        value={this.state.statusInput}
                    />
                </View>
                <View style={styles.buttonInputBox}>
                    <TouchableOpacity 
                        disabled={this.state.statusInput.trim().length>0 && !this.state.isLoading ? false : true}
                        onPress={this.postStatus}
                    >
                        <View style={styles.buttontext} >
                                {this.state.isLoading ? <ActivityIndicator/> : <Text style={{color:'#f8f8f8',textAlignVertical:'center',fontSize:vh(1.799)}}>Post</Text>}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2FC4B2',
        alignItems: 'center',
    },
    text:{
        fontSize: 20,
        textAlign: "center"
    },
    textInputBox:{
        backgroundColor: '#F8F8F8',
        padding:vh(2.248875),
        minHeight:vw(26.666),
        maxHeight:vh(40),
        width:vh(47),
        // width:vw(84),
        marginVertical: vh(1.199),
        borderRadius: vh(0.899),
        flexDirection: 'row',
    },
    imgInput:{
        width:vh(6.7466),
        height: vh(6.7466),
        marginRight: vh(2),
        marginBottom: vh(1.4),
    },
    textInput:{
        fontSize: vh(1.799),
        width:vh(32.5),
        fontWeight: "400"
    },buttontext:{
        marginTop: vh(2.5),
        width: vh(17),
        height: vh(5.547226),
        backgroundColor: '#8DE5DE',
        borderRadius: vh(0.899),
        alignItems: 'center',
        justifyContent: 'center'
    },buttonInputBox:{
        alignItems: 'flex-end',
        width:vh(47.676),
    }
});
