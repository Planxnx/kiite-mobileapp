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

    getIcon = (iconType) =>{
        switch (iconType) {
            case "tiger":
                return require('../assets/tiger.png')
            case "elephant":
                return require('../assets/elephant.png')
            case "cat":
                return require('../assets/cat.png')
            case "dog":
                return require('../assets/dog.png')
            case "penguin":
                return require('../assets/penguin.png')
            default:
                return require('../assets/user.png')
        }
    }

    getTime = (time) =>{
        let todayDate = new Date(),
            createDate = new Date(time)
        let compare = todayDate-createDate
        if (compare > 60e3){
            return `${Math.floor(compare / 60e3)} minutes ago`
        }
        else {
            return `${Math.floor(compare / 1e3)} seconds ago`
        }
    }

    render() {
        const {iconColor,iconType,time} = this.props
        let compareTime = this.getTime(time)
        const styles2 = StyleSheet.create({
            imgColor:{
                backgroundColor: iconColor
            }
        })
        return (
            <View style={styles.container}>
                <View style={styles.innerBox}>
                    <Image
                            style={[styles.imgStatus,styles2.imgColor]}
                            source={this.getIcon(iconType)}
                    />
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
                <Text>
                    {compareTime}
                </Text>
                <View style={styles.bottomLine} />
            </View>
        )
    }
}     
const styles = StyleSheet.create({
    container: {
        marginTop:vh(2.998),
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
        width: vw(90.4266)
    },
    imgStatus:{
        width: vh(6.74662),
        height:vh(6.74662),
        backgroundColor:"#BFBFBF"
    },
    bottomLine:{
        marginTop:vh(2.998),
        alignSelf:"center",
        width: vw(90.4266),
        height: vh(0.14995),
        backgroundColor:"#BFBFBF"
    }
});