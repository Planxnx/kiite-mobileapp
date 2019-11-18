import React,{Component} from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
export default class ShowstatComponent extends Component  {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     const { statData } = this.props
    //     this.setState({
    //         statData : statData
    //     })
    // }

    overallStat = (posPercent,negPercent) =>{
        let posLen , negLen
        if(!posPercent){
            posPercent = 1
            negPercent = 99
        } else if(!negPercent){
            posPercent = 99
            negPercent = 1
        }
        if (posPercent == 0 && negPercent == 0){
            posLen = (50/100)*vh(27.8860569715)
            negLen = posLen
        }else {
            posLen = (posPercent/100)*vh(27.8860569715)
            negLen = (negPercent/100)*vh(27.8860569715)
        }
        return(
            <View>
                <View style={{flexDirection: 'row',}}>
                    <View style={{height:vh(2.24887),width:posLen, backgroundColor:'#2FC4B2',paddingLeft:vh(0.5) }} >
                        <Text style={{color:"#f8f8f8f8",alignSelf:'flex-start',fontSize: vh(1.49925)}}>
                            positive
                        </Text>
                    </View>
                    <View style={{height:vh(2.24887),width:negLen, backgroundColor:'#C4C4C4',paddingRight:vh(0.5), }} >
                        <Text style={{color:"#f8f8f8f8",alignSelf:'flex-end',fontSize: vh(1.49925)}}>
                            negative 
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { statData } = this.props
        let posPercent,negPercent
        if (statData.matcherStat.pos == 0 && statData.matcherStat.neg == 0){
            posPercent = 50
            negPercent = 50
        }else {
            posPercent =  (statData.matcherStat.pos/(statData.matcherStat.neg+statData.matcherStat.pos))*100
            negPercent = 100-posPercent
        }
        
        return (
            <View>
                <View style={styles.container}>
                    <Image
                        style={{
                            width: vh(22.4887556),
                            height: vh(22.4887556),
                            alignSelf:'center'
                        }}
                        source={{uri: 'data:image/png;base64,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'}}
                    />
                    <Text style={[{
                        fontWeight:'bold',
                        fontSize:vh(2.09895052474),
                        textAlign:'center',
                        marginTop:vh(1.14947526237)
                        }]}>
                        {statData.matchName}
                    </Text>
                    <View style={{
                        alignSelf:'center',
                        justifyContent: 'center',
                        marginTop:vh(1.04947526237)
                    }}>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[styles.text,{fontSize:vh(1.34932533733)}]}>
                                {statData.topic} mood
                            </Text>
                        </View>
                        {this.overallStat(posPercent,negPercent)}
                    </View>
                    <Text style={[styles.text,{
                        marginTop:vh(2)
                    }]}>
                        Your name is {statData.yourName}
                    </Text>
                </View>
                <Text style={[styles.text,{
                    marginTop:vh(10),
                    fontSize:vh(1.949),
                    fontWeight:'bold',
                    color:'#F8F8F8'
                }]}>
                    Joining ...
                </Text>
            </View>
        )
    }
}     
const styles = StyleSheet.create({
    container: {
        paddingVertical:vh(2.69865067466),
        textAlign:'center',
        backgroundColor: '#F8F8F8',
        width: vh(45.877),
        height: vh(41.52923),
        borderRadius: vh(0.89955)
    },
    text:{
        fontSize: vh(1.799),
        textAlign:'center'
    },
});