import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import TypeScreen from '../views/TypeScreen/TypeScreen'
import TopicScreen from '../views/TopicScreen/TopicScreen'
import FindScreen from '../views/FindScreen/FindScreen'
import ChatScreen from '../views/ChatScreen/ChatScreen'

const ChatStack = createStackNavigator({
    TypeScreen: TypeScreen,
    TopicScreen: TopicScreen,
    FindScreen: FindScreen,
    ChatScreen: ChatScreen,
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

  ChatStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 1) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };


export default ChatStack;