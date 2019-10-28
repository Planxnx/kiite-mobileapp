import React from 'react';
import { ActivityIndicator,AsyncStorage, StyleSheet, Text, View ,KeyboardAvoidingView ,Image,TouchableHighlight ,TouchableOpacity ,Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { CheckBox } from 'react-native-elements'

export default class CreateScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            usernameInput: "",
            passwordInput: "",
            repasswordInput: "",
            emailInput: "",
            termCheck: false,
            isLoading: false,
        };
    }

    static navigationOptions = {
        headerTintColor: '#F8F8F8',
        headerTransparent: true,
        headerStyle: {
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
        }
    };

    gotoMain = () => {
        this.props.navigation.navigate('Main')
    }

    acceptTerms = () =>{
        Alert.alert(
            'Terms of service',
            'To use Kiite, you must accept the Terms of service',
            [
              {text: 'Accept',
              onPress: () => {
                this.setState({
                    termCheck: true
                });
              }},
              {
                text: 'Not now',
                onPress: () => {
                    this.setState({
                        termCheck: false
                    });
                },
                style: 'cancel',
              },
            ],
          )
        if (!this.state.termCheck) {
            this.setState({
                isLoading: false
            });
            return
        }else{
            this.signUp()
        }
    }

    signUp = async () => {
        this.setState({
            isLoading: true
        });
        if(this.state.usernameInput == "" || this.state.emailInput == "" || this.state.passwordInput == "" || this.state.repasswordInput == ""){
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
        if(this.state.usernameInput.length < 6 || this.state.usernameInput.length > 30 ){
            this.setState({
                isLoading: false
            });
            Alert.alert(
                '',
                "The Username field must be at least 6 characters or less than 30 characters",
                [
                  {text: 'OK'},
                ],
                {cancelable: false},
            )
            return
        }
        if (!this.emailValidate(this.state.emailInput)){
            this.setState({
                isLoading: false
            });
            Alert.alert(
                '',
                "The format of the email address isn't correct",
                [
                  {text: 'OK'},
                ],
                {cancelable: false},
            )
            return
        }
        if(this.state.passwordInput.length < 8 || this.state.passwordInput.length > 24 ){
            this.setState({
                isLoading: false
            });
            Alert.alert(
                '',
                "The Password field must be at least 8 characters or less than 24 characters",
                [
                  {text: 'OK'},
                ],
                {cancelable: false},
            )
            return
        }
        if(this.state.passwordInput != this.state.repasswordInput){
            this.setState({
                isLoading: false
            });
            Alert.alert(
                '',
                "The Confirm Password doesn't match.",
                [
                  {text: 'OK'},
                ],
                {cancelable: false},
            )
            return
        }

        fetch('http://5db18f0de9751d0014ccf91a.mockapi.io/api/vtest/Login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernamee: this.state.usernameInput,
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
                    'Create failed',
                    "Your username or/and email have been used",
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
                    'Create failed',
                    "Something went wrong. Please try again",
                    [
                      {text: 'OK'},
                    ],
                    {cancelable: false},
                )
                return
            }
        }).catch(error=>{
            console.error(error) 
            return
        })   
    }

    emailValidate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false){
            return false;
        }
        else {
            return true;
        }
    }

    render(){
        const { isLoading,warnMessage } = this.state;
        const inputAccessoryViewID = "uniqueID";

        return (
        <KeyboardAvoidingView  style={styles.container}>
            
            <View style={styles.createForm} >
                <Text style={styles.createHeader}>
                    Create account
                </Text> 
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
                        maxLength = {30}
                        onChangeText={usernameInput => {
                            this.setState({ usernameInput });
                        }}
                        value={this.state.usernameInput}
                    />
                </View>
                <View style={styles.textInputBox}>
                    <Image
                        style={styles.imgInput}
                        source={require('./assets/email.png')}
                    />
                    <TextInput 
                        style={styles.textInput}
                        placeholder="E-mail"
                        autoCompleteType="email"
                        autoCapitalize = "none"
                        keyboardType = "email-address"
                        onChangeText={emailInput => {
                            this.setState({ emailInput });
                        }}
                        value={this.state.emailInput}
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
                        autoCapitalize = "none"
                        maxLength = {24}
                        secureTextEntry = {true}
                        onChangeText={passwordInput => {
                            this.setState({ passwordInput });
                        }}
                        value={this.state.passwordInput}
                    />
                </View>
                <View style={styles.textInputBox}>
                    <Image
                        style={styles.imgInput}
                        source={require('./assets/confpass.png')}
                    />
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        autoCompleteType="password"
                        autoCapitalize = "none"
                        maxLength = {24}
                        secureTextEntry = {true}
                        onChangeText={repasswordInput => {
                            this.setState({ repasswordInput });
                        }}
                        value={this.state.repasswordInput}
                    />
                </View>
                <TouchableOpacity>
                    <Text 
                        style={styles.linkText}
                        // onPress={()=>{
                        //     this.props.navigation.navigate('Create')
                        // }}
                    >
                            Terms of service
                    </Text>
                </TouchableOpacity>
                { isLoading ? <TouchableOpacity disabled={true}><View style={styles.buttontext}><ActivityIndicator/></View></TouchableOpacity> : 
                    <TouchableOpacity onPress={this.acceptTerms}><View style={styles.buttontext} ><Text style={{textAlignVertical:'center',fontSize:vh(1.799)}}>Create</Text></View></TouchableOpacity>
                }
             </View>
             <View style={styles.footer} >
                <TouchableOpacity>
                    <Text style={styles.createText}>
                            Privacy&Policy
                    </Text>
                </TouchableOpacity>
                <Text>&nbsp;|&nbsp;</Text>
                <TouchableOpacity>
                    <Text style={styles.createText}>
                            About us
                    </Text>
                </TouchableOpacity>
             </View>
        </KeyboardAvoidingView >
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
    text:{
        fontSize: vh(1.799),
        textAlign: "center"
    },
    createHeader:{
        fontSize: vh(2.9985),
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: vh(2.5487)
    },
    createForm:{
        marginTop:vh(22.038),
        alignItems: 'center',
    },
    textInputBox:{
        backgroundColor: '#F8F8F8',
        width:vh(44.677),
        height: vh(5.847),
        marginVertical: vh(1.6491),
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
    linkText:{
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
