import React from 'react';
import { AsyncStorage,StyleSheet, Text, View ,Image,TouchableOpacity } from 'react-native';
import { vh,vw } from 'react-native-expo-viewport-units';

export default class SettingScreen extends React.Component {

    static navigationOptions = {
        title: 'Kiite’s Messenger',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }
    
    componentDidMount = () => {
        
    }

    findMatcher = (topic) => {
        const { navigation } = this.props
        navigation.navigate('FindScreen', {
            userData: {
                type: navigation.getParam('type', null),
                topic: topic
            },
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.typeBox}>
                    <Text style={{fontWeight:"bold",fontSize:vh(2.098),marginTop:vh(4.34782)}} >Choose your topic</Text>
                    <View style={styles.selectBox}>
                        <TouchableOpacity 
                            onPress={()=>{this.findMatcher("love")}}
                            style={styles.selectButton}
                        >
                            <View style={styles.buttontext} >
                                    <Text style={{color:'#f8f8f8',textAlignVertical:'center',fontSize:vh(1.64917),fontWeight:"bold"}}>
                                        Love
                                    </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=>{this.findMatcher("education")}}
                            style={styles.selectButton}
                        >
                            <View style={styles.buttontext} >
                                    <Text style={{color:'#f8f8f8',textAlignVertical:'center',fontSize:vh(1.64917),fontWeight:"bold"}}>
                                        Education
                                    </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=>{this.findMatcher("general")}}
                            style={styles.selectButton}
                        >
                            <View style={styles.buttontext} >
                                    <Text style={{color:'#f8f8f8',textAlignVertical:'center',fontSize:vh(1.64917),fontWeight:"bold"}}>
                                        General
                                    </Text>
                            </View>
                        </TouchableOpacity>
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
        height:vh(44),
        borderRadius: vh(0.9)
    },
    innerBox:{
        width:vh(24.1379),
        alignItems: 'center',
        marginTop:vh(2.84857)
    },
    selectButton:{
        marginTop:vh(4.34782),
        backgroundColor:'#8DE5DE',
        width:vh(24.28785),
        height: vh(5.997),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vh(0.85),

    },
    typeText:{
        fontSize:vh(1.64917),
        fontWeight:"bold"
    },
});
