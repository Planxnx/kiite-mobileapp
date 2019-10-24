import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../views/LoginScreen/LoginScreen'
import CreateScreen from '../views/CreateScreen/CreateScreen'

const AppStack = createStackNavigator({
    Login: LoginScreen,
    Create: CreateScreen
});

export default AppStack;