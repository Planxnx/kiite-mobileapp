import React from 'react';
import { ActivityIndicator,AsyncStorage, StyleSheet, Text, View ,Button ,Image,TouchableHighlight ,TouchableOpacity ,Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
const config = require('../../config.json')

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            usernameInput: "",
            passwordInput: "",
            isLoading: false,
        };
    }

    static navigationOptions = {
        headerTransparent: true
    };

    gotoMain = () => {
        this.props.navigation.navigate('Main')
    }

    signIn = async () => {
        this.setState({
            isLoading: true
        });
        if(this.state.usernameInput == "" || this.state.passwordInput ==""){
            this.setState({
                isLoading: false
            });
            Alert.alert(
                '',
                "Please fill in all fields",
                [
                  {text: 'OK'},
                ],
                {cancelable: false},
            )
            return
        }

        fetch(`${config.kiiteApi}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.usernameInput,
                password: this.state.passwordInput,
            }),
        })
        .then(response=>response.json())
        .then(async (responseJson) => {
            if(responseJson.status == 200){
                this.setState({
                    isLoading: false,
                    respData: responseJson
                });
                await AsyncStorage.setItem('username', responseJson.data.username);
                await AsyncStorage.setItem('role', responseJson.data.role);
                await AsyncStorage.setItem('token', responseJson.data.token);
                this.props.navigation.navigate('App');
            }else if(responseJson.status == 401){
                this.setState({
                    isLoading: false,
                });
                Alert.alert(
                    'Login failed',
                    "Wrong username or password",
                    [
                      {text: 'OK'},
                    ],
                    {cancelable: false},
                )
                return
            }
            else {
                this.setState({
                    isLoading: false,
                });
                Alert.alert(
                    'Login failed',
                    "Something went wrong or Internet Connection problems . Please try again",
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
                'Login failed',
                "Something went wrong or Internet Connection problems . Please try again",
                [
                  {text: 'OK'},
                ],
                {cancelable: false},
            ) 
            return
        })   
    }

    render(){
        const { isLoading,warnMessage } = this.state;

        return (
        <View style={styles.container}>
            <View style={styles.circle} />
             <View >
                 <Text style={styles.kiiteHeader}>
                    Kiite
                 </Text>
                 <Text style={styles.text}>
                    I'm always here for you
                 </Text>
             </View>
             <View style={styles.loginForm} > 
                <View style={styles.textInputBox}>
                    <Image
                        style={styles.imgInput}
                        source={require('./assets/user.png')}
                    />
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Username"
                        autoCompleteType="username"
                        autoCapitalize = "none"
                        onChangeText={usernameInput => {
                            this.setState({ usernameInput });
                        }}
                        value={this.state.usernameInput}
                    />
                </View>
                <View style={styles.textInputBox}>
                    <Image
                        style={styles.imgInput}
                        source={require('./assets/password.png')}
                    />
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Password"
                        autoCompleteType="password"
                        secureTextEntry = {true}
                        onChangeText={passwordInput => {
                            this.setState({ passwordInput });
                        }}
                        value={this.state.passwordInput}
                    />
                </View>
                <TouchableOpacity style={{marginStart: vh(29.5352),}}>
                        <Text  style={styles.whiteTextButton}>
                            Forgot your password
                        </Text>
                </TouchableOpacity>
                
                { isLoading ? <TouchableOpacity disabled={true}><View style={styles.buttontext}><ActivityIndicator/></View></TouchableOpacity> : 
                    <TouchableOpacity onPress={this.signIn}><View style={styles.buttontext} ><Text style={{textAlignVertical:'center',fontSize:vh(1.799)}}>Login</Text></View></TouchableOpacity>
                }
             </View>
             <View style={styles.createAccount} >
                <Text style={styles.text}>
                    Don't Have an account ? &nbsp;
                </Text>
                <TouchableOpacity>
                    <Text 
                        style={styles.createText}
                        onPress={()=>{
                            this.props.navigation.navigate('Create')
                        }}
                    >
                            Create
                    </Text>
                </TouchableOpacity>
             </View>
             <View style={styles.footer} >
                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('PrivacyPolicy');
                    }}
                >
                    <Text style={styles.createText}>
                        Privacy Policy
                    </Text>
                </TouchableOpacity>
                <Text>&nbsp;|&nbsp;</Text>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Aboutus');
                    }}
                >
                    <Text style={styles.createText}>
                            About us
                    </Text>
                </TouchableOpacity>
             </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2FC4B2',
        alignItems: 'center',
        flexDirection: 'column',
    },
    circle: {
        width: vh(18.29),
        height: vh(18.29),
        borderRadius: vh(18.29/2),
        backgroundColor: '#f8f8f8',
        position: 'absolute',
        right: vw(53.3333),
        top: vh(7.94602),
    },
    text:{
        fontSize: vh(1.799),
        textAlign: "center",
    },
    kiiteHeader:{
        fontSize: vh(11.99),
        textAlign: "center",
        marginTop: vh(11.99),
    },
    loginForm:{
        marginTop:vh(11.99),
        alignItems: 'center',
    },
    textInputBox:{
        backgroundColor: '#F8F8F8',
        width:vh(44.677),
        height: vh(5.847),
        marginVertical: vh(1.199),
        borderRadius: vh(0.899),
        flexDirection: 'row'
    },
    textInput:{
        fontSize: vh(1.799),
        width:vh(39.13),
        height: vh(5.847),
        fontWeight: "400"
    },
    imgInput:{
        width:vh(3.44),
        height: vh(3.44),
        marginVertical: vh(1.199),
        marginHorizontal: vh(1.049)
    },
    buttontext:{
        marginTop: vh(5.2473),
        width: vh(22.189),
        height: vh(5.997),
        backgroundColor: '#8DE5DE',
        borderRadius: vh(0.899),
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteTextButton:{
        color:'#F8F8F8',
        fontSize: vh(1.499),
        textDecorationLine: 'underline',
        marginTop: vh(1.549),
        textAlign:'right'
    },
    createAccount:{
        marginTop:vh(14.791),
        flexDirection: 'row'
    },
    createText:{
        fontSize: vh(1.799),
        color: '#F8F8F8',
        fontWeight:"bold",
        textDecorationLine: 'underline',
    },
    footer:{
        position: 'absolute',
        bottom: vh(2.1487),
        flexDirection: 'row',
        fontSize: vh(1.799),
    }
});
