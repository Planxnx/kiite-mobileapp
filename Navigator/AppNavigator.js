import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainScreen from '../views/MainScreen/MainScreen'
import TimelineScreen from '../views/TimelineScreen/TimelineScreen'
import SettingScreen from '../views/SettingScreen/SettingScreen'

const AppStack = createStackNavigator({
    Main: MainScreen,
    // Timeline: TimelineScreen,
    // Setting: SettingScreen
  });

export default AppStack;