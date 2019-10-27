import React,{Component} from 'react';
import {
  AsyncStorage,
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';


export default class TimelineStatus extends Component  {
    
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.innerBox}>
                <Image
                        style={styles.imgStatus}
                        source={require('../assets/user.png')}
                    />
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
            <View style={styles.bottomLine} />
        </View>
      )
    }
}     
const styles = StyleSheet.create({
    container: {
        marginTop:vh(2.998),
        backgroundColor: '#f5fcff',
        width: vw(100)
    },
    text:{
        fontSize: vh(1.799),
        width: vw(70),
        marginLeft: vw(4.266),
        marginTop:vh(1.799),
    },
    innerBox:{
        flexDirection: 'row',
        alignSelf: 'center',
        width: vw(90.4266),
    },
    imgStatus:{
        width: vh(6.74662),
        height:vh(6.74662)
    },
    bottomLine:{
        marginTop:vh(2.998),
        alignSelf:"center",
        width: vw(90.4266),
        height: vh(0.14995),
        backgroundColor:"#BFBFBF"
    }
});