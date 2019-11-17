import React from 'react';
import { AsyncStorage,StyleSheet,RefreshControl, ActivityIndicator, View ,ScrollView  ,TouchableOpacity,Image,Text,Alert } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import TimelineStatus from  './components/timelineStatus'
import OverallMood from  '../../components/OverallMood'
import io from 'socket.io-client';

export default class TimelineScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "token",
            passwordInput: "",
            isLoading: false,
            refreshing: false,
            message:[],
            newStatus: false,
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
        this.socket = io('https://cloudarch-ite.appspot.com');
        AsyncStorage.multiGet(['username','token','role']).then((data) => {
          this.setState({
            username:data[0][1],
            token:data[1][1],
            role:data[2][1]
          });
          this._fetchStatus(data[1][1])
        })
        this.socket.on('timeline', (data)=>{
            this.setState({
                newStatus: true
            });
        });

    }

    _fetchStatus = (token) =>{
        this.setState({
            isLoading: true
        });
        fetch('https://cloudarch-ite.appspot.com/timeline', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json',
            }
        })
        .then(response=>response.json())
        .then((responseJson) => {
            this.setState({
                message: responseJson.data,
            });             
        })
        this.setState({
            isLoading: false
        }); 
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    };

    _settingApp = () => {
        this.props.navigation.navigate('Setting');
    };

    findOverallMoodPercent = () => {
        let posCount = 0
        let negCount = 0
        this.state.message.map((data,key)=>{
            if(data.mood == 'pos'){
                posCount += 1
            }else if (data.mood == 'neg'){
                negCount += 1
            }
        })
        let posPercent=posCount/(posCount+negCount)*100
        let negPercent=negCount/(posCount+negCount)*100
        return {
            posPercent:posPercent,
            negPercent: negPercent
        }
    }

    _refreshControl(){
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={()=>{
                    this.setState({
                        refreshing:true,
                        newStatus: false
                    })
                    this._fetchStatus(this.state.token)
                    setTimeout(()=>{
                        this.setState({refreshing:false})
                    },750)
                }}
            />
        )
    }

    getNewStatus = () => {
        const { newStatus } = this.state
        switch (newStatus) {
            case true:
                return (
                    <View style={styles.newStatus}>
                        <Text style={styles.text}>
                            Pull down to refresh
                        </Text>
                    </View>
                )
            case false:
                return (
                    <View></View>
                )
        }
    }

    componentWillUnmount = () => {
        this.socket.disconnect()
    }

    render(){
        if(this.state.isLoading){
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>       
            );
        } else{
            let TimelinseStatuses =  this.state.message.map((data,key)=>{
                return <TimelineStatus key = {key} text={data.text} iconType={data.icon.iconType}  iconColor={data.icon.iconColor} time={data.createdDate} />
            })
            let moodPercent = this.findOverallMoodPercent()
            
            return (
                <View style={styles.container}>
                    <OverallMood posPercent={moodPercent.posPercent} negPercent={moodPercent.negPercent} />
                    {this.getNewStatus()}
                    <ScrollView 
                        style={{flex: 1}} 
                        refreshControl={this._refreshControl()}
                    >
                        <View style={{flex: 1,flexDirection:"column-reverse"}} >
                            {TimelinseStatuses}
                        </View>
                    </ScrollView>
                </View>       
            );
        }
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
        fontSize: vh(1.799),
        textAlign: "center",
        color:"#F8F8F8"
    },
    imgInput:{
        width:vh(3.44),
        height: vh(3.44),
        marginRight: vh(3),
        marginBottom: vh(1.4),
        // marginVertical: vh(1.199),
        // marginHorizontal: vh(1.049)
    },
    newStatus:{
        width: vw(100),
        backgroundColor: "#C4C4C4"
    }
});
