import React,{Component} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
const stickerList = [
    {
        title: 'affection',
        mood: 'pos',
        src: require('../assets/stickers/pos/affection.png'),
    },{
        title: 'friendship',
        mood: 'pos',
        src: require('../assets/stickers/pos/friendship.png'),
    },{
        title: 'trustworthy',
        mood: 'neg',
        src: require('../assets/stickers/neg/trustworthy.png'),
    },{
        title: 'handshake',
        mood: 'pos',
        src: require('../assets/stickers/pos/handshake.png'),
    },{
        title: 'hug',
        mood: 'pos',
        src: require('../assets/stickers/pos/hug.png'),
    },{
        title: 'laugh',
        mood: 'pos',
        src: require('../assets/stickers/pos/laugh.png'),
    },{
        title: 'listener',
        mood: 'pos',
        src: require('../assets/stickers/pos/listener.png'),
    },
]

export default class Sticker extends Component  {
    constructor() {
        super();
        this.state = {
            isFailed: false,
        }
    }

    componentDidMount() {
    }

    stickersRow () {
        return stickerList.map((sticker,i)=>{
            return(
                    <TouchableOpacity
                        onPress={()=>{}}
                        key={i}
                    >
                        <Image
                            style={{
                                width: vw(25),
                                height: vw(25),
                                marginVertical: vw(5),
                                marginHorizontal: vw(7)
                            }}
                            source={sticker.src}
                        />
                    </TouchableOpacity>
                )
            })
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView horizontal={true}>
                    {this.stickersRow()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}     
const styles = StyleSheet.create({
    container:{
        width:vw(100),
        backgroundColor: '#C5FFFA',
    },
});