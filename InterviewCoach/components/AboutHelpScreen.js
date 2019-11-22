import * as React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import logo from '../components/logo.png'

export default class AboutHelpScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={logo} />
          <Text style={styles.title}>  INTERVIEW COACH </Text>
          <Text style={styles.subtitle}> The perfect platform to help you prep for your next interview! </Text>
          <Text style={styles.list}> SESSION </Text>
          <Text style={styles.list}> New Session: Pressing this button will start a new interview session and audio recording. The interview coach will begin asking you questions. </Text>
          <Text style={styles.list}> Next Question: Pressing this button will prompt the interview coach to give you a new interview question to answer. </Text>
          <Text style={styles.list}> End Session: Pressing this button will end the interview session and audio recording. Your results will then be analyzed and you will be given your performance results through detailed graphs and charts. </Text>
          <Text style={styles.list}> REPORT </Text>

        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}
            onPress={() => this.props.navigation.navigate('Home')}
          >HOME</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    padding: 25,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: 'white',
    marginTop: 10,
    width: 375,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },
  subtitle: {
    color: 'white',
    marginTop: 10,
    width: 300,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8
  },
  list: {
    color: 'white',
    marginTop: 10,
    width: 350,
    fontSize: 12.5,
    fontWeight: '500',
    textAlign: 'left',
    opacity: 0.8
  },
  buttonContainer: {
    backgroundColor: 'aqua',
    paddingVertical: 10,
    marginBottom: 15,
    padding: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },

});






