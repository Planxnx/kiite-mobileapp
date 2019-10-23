import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../views/LoginScreen'

const AppStack = createStackNavigator({
    Login: LoginScreen,
});

export default AppStack;