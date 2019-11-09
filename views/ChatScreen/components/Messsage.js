import React,{Component} from 'react';
import {
    AsyncStorage,
  Dimensions ,
  Text,
  Image,
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
        const { user,text } = this.props;
    }

    getUserMessage = (time) => {
        const { text } = this.props;
        return (
            <View style={styles.userMessageBox}>
                <Text>
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
                <Text>
                    {time}
                </Text>
            </View>
        )
    }
    getComponent = () =>{
        const { user } = this.props;
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes()
        switch (user) {
            case "matcher":
                return  this.getMatcherMessage(time)
            case "user":
                return this.getUserMessage(time)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                 {this.getComponent()}
            </View>
        )
    }
}     
const styles = StyleSheet.create({
    container:{
        width:vh(56.221889),
    },
    userMessage:{
        padding: vh(1.4),
        backgroundColor: '#E7E6E6',
        fontSize: vh(2.3988),
        borderRadius:vh(0.89955),
        maxWidth: vh(32.9835)
    },
    matcherMessage:{
        padding: vh(1.4),
        backgroundColor: '#C5FFFA',
        fontSize: vh(2.3988),
        borderRadius:vh(0.89955),
        maxWidth: vh(32.9835),
    },
    text:{
        fontSize: vh(2.3988),
    },
    matcherMessageBox:{
        alignSelf:'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    userMessageBox:{
        flexDirection: 'row',
        alignSelf:'flex-end',
        alignItems: 'flex-end',
    }

});