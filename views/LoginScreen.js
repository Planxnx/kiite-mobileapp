import React from 'react';
import { AsyncStorage, StyleSheet, Text, View ,Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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
             <View >
                 <TextInput 
                    style={styles.textInput}
                    placeholder="Username"
                 />
                 <TextInput 
                    style={styles.textInput}
                    placeholder="Password"
                 />
                <Button style={styles.text} title="Sign in!" onPress={this._signInAsync} />
             </View>
             <View >
                <Text style={styles.text}>
                    Don't Have an account ?
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
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    text:{
        fontSize: 12,
        textAlign: "center"
    },
    kiiteHeader:{
        fontSize: 80,
        textAlign: "center"
    },
    textInput:{
        fontSize: 12,
        textAlign: "center",
        backgroundColor: '#F8F8F8',
    },
});
