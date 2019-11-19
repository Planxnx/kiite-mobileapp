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

    getIcon = (iconType) =>{
        switch (iconType) {
            case "tiger":
                return require('../assets/tiger.png')
            case "pig":
                return require('../assets/pig.png')
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

    getThaiName = (iconType) => {
        switch (iconType) {
            case "tiger":
                return "คุณเสือ"
            case "pig":
                return "คุณหมู"
            case "cat":
                return "คุณแมว"
            case "dog":
                return "คุณหมา"
            case "penguin":
                return "คุณเพนกวิ้น"
            default:
                return "คุณอะไรของมึงวะ"
        }
    }

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
        const { statData,matchName } = this.props
        let posPercent,negPercent
        if (statData.matcherStat.pos == 0 && statData.matcherStat.neg == 0){
            posPercent = 50
            negPercent = 50
        }else {
            posPercent =  (statData.matcherStat.pos/(statData.matcherStat.neg+statData.matcherStat.pos))*100
            negPercent = 100-posPercent
        }
        const hexString = (0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        const styles2 = StyleSheet.create({
            imgColor:{
                
            }
        })
        
        return (
            <View>
                <View style={styles.container}>
                    <Image
                        style={{
                            width: vh(22.4887556),
                            height: vh(22.4887556),
                            alignSelf:'center',
                            backgroundColor: `#${hexString}`
                        }}
                        source={this.getIcon(statData.matchName)}
                    />
                    <Text style={[{
                        fontWeight:'bold',
                        fontSize:vh(2.09895052474),
                        textAlign:'center',
                        marginTop:vh(1.14947526237)
                        }]}>
                        {this.getThaiName(statData.matchName)}
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
                        Your name is {this.getThaiName(statData.yourName)}
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