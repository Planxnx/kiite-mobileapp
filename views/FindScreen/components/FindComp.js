import React,{Component} from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Animated,
  Image,
  Easing
} from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';


export default class FindingComponent extends Component  {
    constructor () {
      super()
      this.spinValue = new Animated.Value(0)
    }

    componentDidMount () {
      this.spin()
    }

    spin = () => {
      this.spinValue.setValue(0)
      Animated.timing(
        this.spinValue,
        {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear
        }
      ).start(() => this.spin())
    }
    
    render() {
      const { userInQueue,isLoading } = this.props
      if(isLoading){
        const spin = this.spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
        return (
          <View style={styles.container}>
              <View style={styles.innerBox}>
                <Animated.Image
                    style={{
                      width: vh(26.0869565217),
                      height: vh(25.5217391304),
                      transform: [{rotate: spin}] 
                    }}
                    source={require('../assets/loading1.png')}
                />
                <View style={{marginTop:vh(5.84707)}}>
                  <Text style={[styles.text,{fontWeight:'bold'}]}>Finding user...</Text>
                  <Text style={styles.text}>{this.props.userInQueue} in queue</Text>
                </View>
              </View>
          </View>
        )
      }else{
        return (
          <View style={styles.container}>
              <View style={styles.innerBox}>
                <Image
                    style={{
                        width: vh(26.0869565217),
                        height: vh(25.5217391304),
                      }}
                    source={require('../assets/loading2.png')}
                />
                <View style={{marginTop:vh(5.84707)}}>
                  <Text style={[styles.text,{fontWeight:'bold'}]}>Matched !</Text>
                </View>
              </View>
          </View>
        )
      }
      
    }
}     
const styles = StyleSheet.create({
    container: {
        textAlign:'center'
    },
    text:{
        fontSize: vh(1.799),
        textAlign:'center',
        color:'#F8F8F8'
    },
    innerBox:{
      alignItems:"center"
    }
});