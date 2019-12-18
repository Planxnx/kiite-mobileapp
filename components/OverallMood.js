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

export default class OverallMood extends Component  {
    constructor() {
        super();
        this.state = {
            disconnected: false
        }
    }

    componentDidMount() {

    }
    render() {
        let { posPercent,negPercent } = this.props;
        let posLen , negLen
        if(!posPercent && !negPercent){
            posPercent = 50
            negPercent = 50
        }else if(!posPercent){
            posPercent = 1
            negPercent = 99
        } else if(!negPercent){
            posPercent = 99
            negPercent = 1
        }
        if (posPercent == 0 && negPercent == 0){
            posLen = (50/100)*vw(90.66)
            negLen = posLen
        }else {
            posLen = (posPercent/100)*vw(90.66)
            negLen = (negPercent/100)*vw(90.66)
        }
        
        return (
            <View style={styles.container}>
                <View style={{width:vw(90.66),alignItems:'flex-start'}}>
                    <Text style={{color:"#f8f8f8f8",fontSize: vh(1.799)}}>
                        currently mood
                    </Text>
                </View>
                <View style={{flexDirection: 'row',}}>
                    <View style={{height:vh(2.24887),width:posLen, backgroundColor:'#2FC4B2',paddingLeft:vh(0.7496) }} >
                        <Text style={{color:"#f8f8f8f8",alignSelf:'flex-start',fontSize: vh(1.799)}}>
                            positive
                        </Text>
                    </View>
                    <View style={{height:vh(2.24887),width:negLen, backgroundColor:'#C4C4C4',paddingRight:vh(0.7496), }} >
                        <Text style={{color:"#f8f8f8f8",alignSelf:'flex-end',fontSize: vh(1.799)}}>
                            negative 
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}     
const styles = StyleSheet.create({
    container: {
        height:vh(6.14692),
        backgroundColor: '#8DE5DE',
        width: vw(100),
        alignItems:"center", //แกน X อยุ่ตรงกลาง
        justifyContent: 'center', //แกน Y อยุ่ตรงกลาง
    },
    text:{
        fontSize: vh(1.799),
        width: vw(70),
        marginLeft: vw(4.266),
        marginTop:vh(1.799),
    },
    posBar:{
    }
});