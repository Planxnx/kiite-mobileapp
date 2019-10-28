import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SettingStack from './SettingStack' 
import TimelineStack from './TimelineStack'

const TabNavigator = createBottomTabNavigator({
    Timeline: { screen: TimelineStack },
    Settings: { screen: SettingStack },
});

export default createAppContainer(TabNavigator);