import React from 'react';
import { AsyncStorage,StyleSheet,Text, Button, View ,ScrollView  ,TouchableOpacity,Image } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import TimelineStatus from  './components/timelineStatus'
import OverallStatus from  './components/overallStatus'

export default class MainScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "token",
            passwordInput: "",
            isLoading: false,
            exmapleResp: {
                status:200,
                data:[
                    {
                        text: "pretium cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at",
                        mood: "pos"
                    },{
                        text: "tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo",
                        mood: "neg"
                    },{
                        text: "viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse",
                        mood: "neg"
                    },{
                        text: "adipiscing commodo elit at imperdiet dui accumsan sit amet nulla facilisi",
                        mood: "neg"
                    },{
                        text: "felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet",
                        mood: "pos"
                    },{
                        text: "non enim praesent eget nulla facilisi etiam dignissim diam quis enim lobortis sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut",
                        mood: "neg"
                    },{
                        text: "non enim praesent eget nulla facilisi etiam dignissim diam quis enim lobortis sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut",
                        mood: "neg"
                    },{
                        text: "felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet",
                        mood: "pos"
                    },{
                        text: "felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet",
                        mood: "pos"
                    },{
                        text: "felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet",
                        mood: "neg"
                    },{
                        text: "felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet",
                        mood: "neg"
                    }
                ]     
            }
        }
        this._findMoodCount()
    }

    static navigationOptions = {
        title: 'Kiite’s Timeline',
        headerTintColor: '#F8F8F8',
        headerStyle: {
            backgroundColor: '#2FC4B2' ,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
        },
        headerTitleStyle: {
            fontWeight: 'bold', 
        },
        headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
            >   
                <Image
                    style={styles.imgInput}
                    source={require('./assets/createStatus.png')}
                />
            </TouchableOpacity>
        ),
    }

    componentDidMount() {
        AsyncStorage.multiGet(['username','token','role']).then((data) => {
          this.setState({
            username:data[0][1],
            token:data[1][1],
            role:data[2][1]
          });
        });
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    };

    _settingApp = () => {
        this.props.navigation.navigate('Setting');
    };

    _findMoodCount = async () => {
        let posCount = 0
        let negCount = 0
        for (let i = 0; i < this.state.exmapleResp.data.length; i++){
            if (this.state.exmapleResp.data[i].mood == "pos"){
                posCount +=1
            }else{
                negCount +=1
            }
        }
        posCount = posCount/(posCount+negCount)*100
        await AsyncStorage.setItem('posCount', posCount.toString());
    }

    render(){

        const TimelinseStatuses =  this.state.exmapleResp.data.map((data,key)=>{
            return <TimelineStatus key = {key} text={data.text} />
        })

        return (
            <View style={styles.container}>
                <OverallStatus/>
                <ScrollView style={{flex: 1}} >
                    {TimelinseStatuses}
                </ScrollView>
                <View >
                    <Text>{this.state.posCount}</Text>
                    <Button title="sign out" onPress={this._signOutAsync} />
                </View>
            </View>
            
        );
    }

    
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 20,
        textAlign: "center"
    },
    imgInput:{
        width:vh(3.44),
        height: vh(3.44),
        marginRight: vh(3),
        marginBottom: vh(1.4),
        // marginVertical: vh(1.199),
        // marginHorizontal: vh(1.049)
        }
});
