import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import AboutHelpScreen from './components/AboutHelpScreen';
import { StyleSheet, Text, View, DrawerLayoutAndroid, ToolbarAndroid } from 'react-native';
import InSession from './components/InSession';
import Logout from './components/Logout'
import Report from './components/Report';
import HistorySessionScreen from './components/HistorySessionScreen';


export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <AppContainer style={styles.container} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  }
});
const RootStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Report: Report,

    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    'New Session': InSession,
    Report: {
      screen: Report,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    History: HistorySessionScreen,
    'How To Use': AboutHelpScreen,
    'Logout': HomeScreen
  },
  {
    initialRouteName: 'Home',
    drawerWidth: 200,
    icon: './components/icon.png'
  }
);


const AppContainer = createAppContainer(RootStack);
