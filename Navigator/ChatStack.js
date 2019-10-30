import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import TypeScreen from '../views/TypeScreen/TypeScreen'
import TopicScreen from '../views/TopicScreen/TopicScreen'
import ChatScreen from '../views/ChatScreen/ChatScreen'

const ChatStack = createStackNavigator({
    TypeScreen: TypeScreen,
    TopicScreen:TopicScreen,
    ChatScreen:ChatScreen,
  },
  {
    initialRouteName: 'TypeScreen',
    defaultNavigationOptions: {
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
    },
  });

export default ChatStack;