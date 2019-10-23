import React from 'react';
import { AsyncStorage, StyleSheet, Text, View ,Button ,Image,TouchableHighlight ,TouchableOpacity  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    gotoMain = () => {
        this.props.navigation.navigate('Main')
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    }

    render(){
        return (
        <View style={styles.container}>
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
                    />
                </View>
                <TouchableOpacity style={{marginStart: vh(29.5352),}}>
                        <Text  style={styles.whiteTextButton}>
                            Forgot your password
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this._signInAsync}
                >
                    <View style={styles.buttontext} >
                        <Text style={{textAlignVertical:'center',fontSize:vh(1.799)}}>Login</Text>
                    </View>
                </TouchableOpacity>
             </View>
             <View style={styles.createAccount} >
                <Text style={styles.text}>
                    Don't Have an account ? &nbsp;
                </Text>
                <TouchableOpacity>
                        <Text style={styles.createText}>
                            Create
                        </Text>
                </TouchableOpacity>
             </View>
             <View style={styles.footer} >
                 <Text style={styles.createText}>
                     Privacy & Policy
                 </Text>
                 <Text>&nbsp;|&nbsp;</Text>
                 <Text style={styles.createText} >
                     About us
                 </Text>
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
    text:{
        fontSize: vh(1.799),
        textAlign: "center"
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
