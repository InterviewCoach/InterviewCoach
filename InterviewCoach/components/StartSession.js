import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default class StartSession extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "Welcome to InterviewCoach. Let's get started!"
    }
  }

  static defaultProps = {
    message: 'I am StartSession Component'
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>{this.state.message}</Text>
        {/* <Text>Hello test</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
