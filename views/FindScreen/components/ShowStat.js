import React,{Component} from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';

export default class ShowstatComponent extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        } 
    }

    // componentDidMount() {
    //     const { statData } = this.props
    //     this.setState({
    //         statData : statData
    //     })
    // }

    render() {
        const { statData } = this.props
        let posPercent =  (statData.matcherStat.pos/(statData.matcherStat.neg+statData.matcherStat.pos))*100
        let negPercent = 100-posPercent
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {statData.matchName}
                    </Text>
                    <Text style={styles.text}>
                        pos: {posPercent}%
                        neg: {negPercent}%
                    </Text>
                    <Text style={styles.text}>
                        {statData.topic} mood
                    </Text>
                </View>
                <Text style={styles.text}>
                    Joining ...
                </Text>
            </View>
        )
    }
}     
const styles = StyleSheet.create({
    container: {
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