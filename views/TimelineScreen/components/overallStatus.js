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

export default class OverallStatus extends Component  {
    constructor() {
        super();
        this.state = {
            posPercent:0.5,
            negPercent:0.5
        }
    }

    componentDidMount() {
        this._bootstrapAsync()
    }
    _bootstrapAsync = async() =>{
        const posCount = await AsyncStorage.getItem('posCount');
        let {width, height} = Dimensions.get('window')
        const posPercentW = (height*50.97/100) * parseInt(posCount)/100 
        const negPercentW =  (height*50.97/100) - posPercentW
        this.setState({
            posPercentW:150,
            negPercentW:150,
            // posPercentW:posPercentW,
            // negPercentW:negPercentW,
            height: height
          });
        await AsyncStorage.removeItem('posCount');

    }
    render() {
        const { posPercentW,negPercentW,height } = this.state;

        return (
            <View style={styles.container}>
                <View style={{width:vh(50.97),alignItems:'flex-start'}}>
                    <Text style={{color:"#f8f8f8f8",fontSize: vh(1.799)}}>
                        currently mood
                    </Text>
                </View>
                <View style={{flexDirection: 'row',}}>
                    <View style={{height:vh(2.24887),width:posPercentW, backgroundColor:'#2FC4B2',paddingLeft:vh(0.7496) }} >
                        <Text style={{color:"#f8f8f8f8",alignSelf:'flex-start',fontSize: vh(1.799)}}>
                            positive
                        </Text>
                    </View>
                    <View style={{height:vh(2.24887),width:negPercentW, backgroundColor:'#C4C4C4',paddingRight:vh(0.7496), }} >
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