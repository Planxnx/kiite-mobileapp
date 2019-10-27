import React from 'react';
import { AsyncStorage,StyleSheet, Button, View ,ScrollView  ,TouchableOpacity,Image } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import TimelineStatus from  './components/timelineStatus'
export default class MainScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "token",
            passwordInput: "",
            isLoading: false,
            exmapleText:[
                {
                    status:200,
                    data:{
                        text:"justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra"
                    }
                },{
                    status:200,
                    data:{
                        text:"dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut"
                    }
                },{
                    status:200,
                    data:{
                        text:"lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac"
                    }
                },{
                    status:200,
                    data:{
                        text:"vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa"
                    }
                },{
                    status:200,
                    data:{
                        text:"aliquet eget sit amet tellus cras adipiscing enim eu turpis"
                    }
                },{
                    status:200,
                    data:{
                        text:"ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et"
                    }
                },{
                    status:200,
                    data:{
                        text:"dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum"
                    }
                },{
                    status:200,
                    data:{
                        text:"proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in"
                    }
                },
            ]
        }
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

    render(){
        const TimelinseStatuses =  this.state.exmapleText.map((data,key)=>{
            return <TimelineStatus key = {key} text={data.data.text} />
        })
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1}} >
                    {TimelinseStatuses}
                </ScrollView>
                <View >
                    <Button title="sign out" onPress={this._signOutAsync} />
                </View>
            </View>
            
        );
    }

    _settingApp = () => {
        this.props.navigation.navigate('Setting');
    };
    
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
