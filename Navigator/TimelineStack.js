import {createStackNavigator} from 'react-navigation-stack';

import TimelineScreen from '../views/TimelineScreen/TimelineScreen'
import CreateStatusScreen from '../views/CreateStatusScreen/CreateStatusScreen'

const TimelineStack = createStackNavigator({
    Timeline: TimelineScreen,
    CreateStatus: CreateStatusScreen
  },
  {
    initialRouteName: 'Timeline',
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

  TimelineStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };

export default TimelineStack;