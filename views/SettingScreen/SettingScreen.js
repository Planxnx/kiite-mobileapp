import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Image,TouchableOpacity } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';

export default class SettingScreen extends React.Component {

    static navigationOptions = {
        title: 'Setting',
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    };

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Aboutus')}
                >
                    <View style={styles.buttonBox}>
                        <View style={styles.buttonBoxLeft}>
                            <Image
                                style={styles.imgInput}
                                source={require('./assets/aboutus.png')}
                            />
                            <Text style={styles.text}>
                                About us
                            </Text>
                        </View>
                        <View style={styles.buttonBoxRight}>
                            <Image
                                style={styles.nextbutton}
                                source={require('./assets/next.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('PrivacyPolicy')}
                >
                    <View style={styles.buttonBox}>
                        <View style={styles.buttonBoxLeft}>
                            <Image
                                style={styles.imgInput}
                                source={require('./assets/privacy.png')}
                            />
                            <Text style={styles.text}>
                                Privacy Policy
                            </Text>
                        </View>
                        <View style={styles.buttonBoxRight}>
                            <Image
                                style={styles.nextbutton}
                                source={require('./assets/next.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                        onPress={this._signOutAsync}
                >
                    <View style={styles.buttonBox}>
                        <View style={styles.buttonBoxLeft}>
                            <Image
                                style={styles.imgInput}
                                source={require('./assets/logout.png')}
                            />
                            <Text style={styles.text}>
                                Log Out
                            </Text>
                        </View>
                        <View style={styles.buttonBoxRight}>
                            <Image
                                style={styles.nextbutton}
                                source={require('./assets/next.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  text:{
      fontSize: vh(2.3988),
      marginLeft:vh(1.799)
  },
  buttonBox:{
      width:vw(100),
      height:vh(7),
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:vw(4.8)
  },
  buttonBoxLeft:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    width:vw(45.2)
  },
  buttonBoxRight:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    width:vw(45.2)
  },
  imgInput:{
      width:vh(4.047976),
      height:vh(4.047976)
  },
  nextbutton:{
    width:vh(3.448275862),
    height:vh(3.448275862),
  }
});
