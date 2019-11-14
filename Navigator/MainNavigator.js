import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { createAppContainer } from 'react-navigation';
import { vw, vh } from 'react-native-expo-viewport-units';
import { createBottomTabNavigator,BottomTabBar  } from 'react-navigation-tabs';

import SettingStack from './SettingStack' 
import TimelineStack from './TimelineStack'
import ChatStack from './ChatStack'

const TabBarComponent = props => <BottomTabBar {...props} />;

const TabNavigator = createBottomTabNavigator({
    Timeline: { 
        screen: TimelineStack,
        navigationOptions: {
            tabBarIcon: ({tintColor, activeTintColor}) => (
                <Icon name="ios-paper" size={vh(5.2473763)} color={tintColor} />
            )
        }
    },
    Chat: { 
        screen: ChatStack,
        navigationOptions: {
            tabBarIcon: ({tintColor, activeTintColor}) => (
                <Icon name="ios-chatboxes" size={vh(5.2473763)} color={tintColor} />
            )
        }
     },
    Settings: { 
        screen: SettingStack,
        navigationOptions: {
            tabBarIcon: ({tintColor, activeTintColor}) => (
                <Icon name="ios-settings" size={vh(5.2473763)} color={tintColor} />
            )
        }
     },
},
{
  tabBarOptions :{
    showLabel: false,
    activeTintColor : "#EA5757",
    style:{
        backgroundColor: "rgba(47, 196, 178,0.3)"
    }
  }
});

export default createAppContainer(TabNavigator);