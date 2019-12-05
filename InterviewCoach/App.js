import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import AboutHelpScreen from './components/AboutHelpScreen';
import { StyleSheet, Text, View, DrawerLayoutAndroid, ToolbarAndroid } from 'react-native';
import InSession from './components/InSession';
// import Splash from './components/Splash';
import Report from './components/Report';
import HistorySessionScreen from './components/HistorySessionScreen';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <AppContainer style={styles.container}/>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  }
});
const RootStack = create(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    SignupScreen: SignupScreen,
    Report: Report,
    InSession: InSession,
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: ()=>null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        drawerLabel: ()=>null
      }
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        drawerLabel: ()=>null
      }
    },
    'About': AboutHelpScreen,
    'New Session': InSession,
    Report: {
      screen: Report,
      navigationOptions: {
        drawerLabel: ()=>null
      }
    },
    History: HistorySessionScreen,
  },
  {
    initialRouteName: 'Home',
  }
);



// const drawer = createDrawerNavigator(
//   {
//     AboutHelp: AboutHelpScreen,
//     StartSession: InSession,
//     History: HistorySessionScreen
//   },
//   {
//     initialRouteName: 'AboutHelp',
//   }
// );

// const MainStack = createSwitchNavigator(
//   {
//     Home: RootStack,
//     InSession: drawer
//   }
// )

const AppContainer = createAppContainer(RootStack);
