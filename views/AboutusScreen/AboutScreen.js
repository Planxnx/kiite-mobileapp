import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Image,TouchableOpacity } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';

export default class SettingScreen extends React.Component {

    static navigationOptions = {
        title: 'About us',
    };

    render(){
        return (
            <View style={styles.container}>
                < Image
                    style={{width:vh(10),height:vh(10)}}
                    source={require('./assets/icon.png')}
                />
                <Text>
                    Kiite KUY
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    alignItems:'center'
  },
  text:{
      fontSize: vh(2.3988),
      marginLeft:vh(1.799)
  },
});
