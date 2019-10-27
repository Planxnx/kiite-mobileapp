import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainScreen from '../views/MainScreen/MainScreen'
import SettingScreen from '../views/SettingScreen/SettingScreen'

const AppStack = createStackNavigator({
    Main: MainScreen,
    Setting: SettingScreen
  });

export default AppStack;