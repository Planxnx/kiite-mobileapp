import React,{Component} from 'react';
import {
    AsyncStorage,
  Dimensions ,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';

export default class Messages extends Component  {
    constructor() {
        super();
        this.state = {
            isFailed: false,
        }
    }

    componentDidMount() {
    }

    getUserMessage = (time) => {
        const { text } = this.props;
        return (
            <View style={styles.userMessageBox}>
                <Text style={styles.time}>
                    {time}
                </Text>
                <View style={styles.userMessage} >
                    <Text>
                        {text}
                    </Text>
                </View>
            </View>
        )
    }
    getMatcherMessage = (time) => {
        const { text } = this.props;
        return (
            <View style={styles.matcherMessageBox}>
                <View style={styles.matcherMessage} >
                    <Text>
                        {text}
                    </Text>
                </View>
                <Text style={styles.time}>
                    {time}
                </Text>
            </View>
        )
    }
    getComponent = () =>{
        const { user,time } = this.props;
        switch (user) {
            case "matcher":
                return  this.getMatcherMessage(time)
            case "user":
                return this.getUserMessage(time)
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                 {this.getComponent()}
            </SafeAreaView>
        )
    }
}     
const styles = StyleSheet.create({
    container:{
        width:vw(100),
    },
    userMessage:{
        padding: vh(1.4),
        backgroundColor: '#E7E6E6',
        fontSize: vh(2.3988),
        borderRadius:vh(0.89955),
        maxWidth: vh(30)
    },
    matcherMessage:{
        padding: vh(1.4),
        backgroundColor: '#C5FFFA',
        fontSize: vh(2.3988),
        borderRadius:vh(0.89955),
        maxWidth: vh(30),
    },
    text:{
        fontSize: vh(2.3988),
    },
    matcherMessageBox:{
        alignSelf:'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginHorizontal: vh(1.7991),
        marginVertical: vh(1)
    },
    userMessageBox:{
        flexDirection: 'row',
        alignSelf:'flex-end',
        alignItems: 'flex-end',
        marginHorizontal: vh(1.7991),
        marginVertical: vh(1)
    },
    time:{
        fontSize: vh(1.4992),
        marginHorizontal: vh(1.649),
    }

});