import {createAppContainer , createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../views/LoginScreen/LoginScreen'
import CreateScreen from '../views/CreateScreen/CreateScreen'
import AboutScreen from '../views/AboutusScreen/AboutScreen'
import PrivacyScreen from '../views/PrivacyScreen/PrivacyScreen'

const AppStack = createStackNavigator({
    Login: LoginScreen,
    Create: CreateScreen,
    Aboutus: {
        screen: AboutScreen,
        navigationOptions : {
            headerTintColor: '#262626',
            headerTransparent: false,
            headerStyle: {
                backgroundColor: '#2FC4B2',
            }
        }
    },
    PrivacyPolicy: {
        screen: PrivacyScreen,
        navigationOptions : {
            headerTintColor: '#262626',
            headerTransparent: false,
            headerStyle: {
                backgroundColor: '#2FC4B2',
            }
        }
    }
});

export default AppStack;