import React, { Component } from 'react'
import {
  StyleSheet, Text, View, Button,
  TouchableOpacity
} from 'react-native';
export default class StartSession extends Component {
  constructor(props) {
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
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate('InSession')}
          >
            START SESSION
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: 'aqua',
    paddingVertical: 20,
    marginBottom: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
});





