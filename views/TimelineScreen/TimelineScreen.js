import React from 'react';
import { AsyncStorage,StyleSheet,Text, ActivityIndicator, View ,ScrollView  ,TouchableOpacity,Image } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import TimelineStatus from  './components/timelineStatus'
import OverallStatus from  './components/overallStatus'

export default class TimelineScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "token",
            passwordInput: "",
            isLoading: false,
            respData:{
                data:[{mood:"pos"}]
            }
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Kiite’s Timeline',
        headerRight: (
            <TouchableOpacity
                navigation={navigation}

                onPress={()=>{navigation.navigate('CreateStatus')}}
            >   
                <Image
                    style={styles.imgInput}
                    source={require('./assets/createStatus.png')}
                />
            </TouchableOpacity>
        )
    })

    componentDidMount() {
        AsyncStorage.multiGet(['username','token','role']).then((data) => {
          this.setState({
            username:data[0][1],
            token:data[1][1],
            role:data[2][1]
          });
        });
        this._fetchStatus()
    }

    _fetchStatus = () =>{
        this.setState({
            isLoading: true
        });
        fetch('http://5db18f0de9751d0014ccf91a.mockapi.io/api/vtest/timeline/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response=>response.json())
        .then((responseJson) => {
            this.setState({
                respData: responseJson,
            }); 
            this._findMoodCount()
            this.setState({
                isLoading: false
            });                
        })
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
        for (let i = 0; i < this.state.respData.data.length; i++){
            if (this.state.respData.data[i].mood == "pos"){
                posCount +=1
            }else{
                negCount +=1
            }
        }
        posCount = posCount/(posCount+negCount)*100
        await AsyncStorage.setItem('posCount', posCount.toString());
    }

    render(){
        if(this.state.isLoading){
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>       
            );
        } else{
            let TimelinseStatuses =  this.state.respData.data.map((data,key)=>{
                return <TimelineStatus key = {key} text={data.text} />
            })
            return (
                <View style={styles.container}>
                    <OverallStatus/>
                    <ScrollView style={{flex: 1}} >
                        {TimelinseStatuses}
                    </ScrollView>
                </View>       
            );
        }

        
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
