import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SettingScreen from '../views/SettingScreen/SettingScreen'

const TimelineStack = createStackNavigator({
    Setting: SettingScreen
  });

export default TimelineStack;