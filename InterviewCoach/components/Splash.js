import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';


const Splash = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#bdecb6" />
      <Text>{props.message}</Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
