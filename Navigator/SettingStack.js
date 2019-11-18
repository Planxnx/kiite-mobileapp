import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SettingScreen from '../views/SettingScreen/SettingScreen'
import AboutScreen from '../views/AboutusScreen/AboutScreen'
import PrivacyScreen from '../views/PrivacyScreen/PrivacyScreen'

const TimelineStack = createStackNavigator({
    Setting: SettingScreen,
    Aboutus: AboutScreen,
    PrivacyPolicy: PrivacyScreen
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