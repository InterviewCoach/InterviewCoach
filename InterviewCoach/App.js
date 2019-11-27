import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import AboutHelpScreen from './components/AboutHelpScreen';
import { StyleSheet, Text, View } from 'react-native';
import InSession from './components/InSession'
// import Splash from './components/Splash';
import Report from './components/Report'

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
  },
});
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    AboutHelp: AboutHelpScreen,
    InSession: InSession,
    Report: Report,

  },
  {
    initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(RootStack);

