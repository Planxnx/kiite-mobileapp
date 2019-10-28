import {createStackNavigator} from 'react-navigation-stack';

import TimelineScreen from '../views/TimelineScreen/TimelineScreen'

const TimelineStack = createStackNavigator({
    Timeline: TimelineScreen,
  });

export default TimelineStack;