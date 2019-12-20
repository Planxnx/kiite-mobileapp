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
                <Text style={{fontWeight: 'bold',fontSize:vh(3)}}>
                        Kiite
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                    จัดทำโดย
                </Text>
                <Text>
                        - แคทลียา อเนกจินต์ {`\n`}
                        - ฉัตรชัยพัฒน์ เดชธัญญนน {`\n`}
                        - ธานี จรัสตระกูล {`\n`}
                        - พงศกร ปานประเสริฐ {`\n`}
                        - สิริกร เรืองสุวรรณ {`\n`}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                    ติดต่อ
                </Text>
                <Text>
                       60010465@kmitl.ac.th
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
  }
});
