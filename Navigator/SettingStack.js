import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SettingScreen from '../views/SettingScreen/SettingScreen'

const TimelineStack = createStackNavigator({
    Setting: SettingScreen
  },
  {
    initialRouteName: 'Setting',
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

export default TimelineStack;