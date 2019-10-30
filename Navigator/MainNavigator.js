import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SettingStack from './SettingStack' 
import TimelineStack from './TimelineStack'
import ChatStack from './ChatStack'

const TabNavigator = createBottomTabNavigator({
    Timeline: { screen: TimelineStack },
    Chat: { screen: ChatStack },
    Settings: { screen: SettingStack },
});

export default createAppContainer(TabNavigator);