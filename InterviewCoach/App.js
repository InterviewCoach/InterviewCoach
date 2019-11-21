import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './components/Splash';
import Report from './components/Report'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>TEST Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
