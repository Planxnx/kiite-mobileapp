import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';

export default class SettingScreen extends React.Component {

    static navigationOptions = {
        title: 'Privacy Policy',
    };

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    Kiite
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
