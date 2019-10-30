import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Image,TouchableOpacity } from 'react-native';
import { vh,vw } from 'react-native-expo-viewport-units';

export default class SettingScreen extends React.Component {

    static navigationOptions = {
        title: 'Kiite’s Messenger',
    };

    gotoLogin = () => {
        const { navigation } = this.props
        navigation.navigate('Login')
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.typeBox}>
                    <Text style={{fontWeight:"bold",fontSize:vh(2.098),marginTop:vh(1.649)}} >Who are you ?</Text>
                    <View style={styles.selectBox}>
                        <View style={styles.innerBox}>
                            <Text style={styles.typeText}>
                                Helper
                            </Text>
                            <Image
                                style={styles.helperImg}
                                source={require('./assets/helper.png')}
                            />
                            <TouchableOpacity 
                                onPress={()=>{
                                    this.props.navigation.navigate('TopicScreen', {
                                        type: 'helper',
                                    });
                                }}
                                style={styles.selectButton}
                            >
                                <View style={styles.buttontext} >
                                        <Text style={{color:'#f8f8f8',textAlignVertical:'center',fontSize:vh(1.64917),fontWeight:"bold"}}>
                                            Select
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.usernumberText}>
                                0 users in queue
                            </Text>
                        </View>
                        <View style={styles.innerBox}>
                            <Text style={styles.typeText}>
                                User
                            </Text>
                            <Image
                                style={styles.userImg}
                                source={require('./assets/user.png')}
                            />
                            <TouchableOpacity 
                                onPress={()=>{
                                    this.props.navigation.navigate('TopicScreen', {
                                        type: 'user',
                                    });
                                }}
                                style={styles.selectButton}
                            >
                                <View style={styles.buttontext} >
                                        <Text style={{color:'#f8f8f8',textAlignVertical:'center',fontSize:vh(1.64917),fontWeight:"bold"}}>
                                            Select
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.usernumberText}>
                                19 users in queue
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDED',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 20,
        textAlign: "center"
    },
    typeBox:{
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        width: vh(48.2758),
        height:vh(33.13343),
        borderRadius: vh(0.9)
    },
    selectBox:{
        flexDirection:'row'
    },
    innerBox:{
        width:vh(24.1379),
        alignItems: 'center',
        marginTop:vh(2.84857)
    },
    userImg:{
        marginTop:vh(1.2),
        height:vh(13.193),
        width:vh(10.973)
    },
    helperImg:{
        marginTop:vh(1.2),
        height:vh(13.193),
        width:vh(13.7931)
    },
    selectButton:{
        marginTop:vh(0.3),
        backgroundColor:'#8DE5DE',
        width:vh(13.7931),
        height: vh(3.7481),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vh(0.85)
    },
    typeText:{
        fontSize:vh(1.64917),
        fontWeight:"bold"
    },
    usernumberText:{
        fontSize:vh(1.49925)
    }
});
