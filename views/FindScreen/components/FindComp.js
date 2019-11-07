import React,{Component} from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';


export default class FindingComponent extends Component  {
    
    render() {
      const { userInQueue,isLoading } = this.props
      if(isLoading){
        return (
          <View style={styles.container}>
              <View style={styles.innerBox}>
                <Text>Finding user...</Text>
                <ActivityIndicator/>
                <Text style={styles.text}>{this.props.userInQueue} in queue</Text>
              </View>
          </View>
        )
      }else{
        return (
          <View style={styles.container}>
              <View style={styles.innerBox}>
                <Text>Matched !</Text>
              </View>
          </View>
        )
      }
      
    }
}     
const styles = StyleSheet.create({
    container: {
        marginTop:vh(2.998),
        textAlign:'center'
    },
    text:{
        fontSize: vh(1.799),
        textAlign:'center'
    },
});