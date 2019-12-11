import * as React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import logo from '../components/logo.png';
import hamburger from '../components/hamburgerBlack.png';

// About component where a user can get helpful information about using the app
export default class AboutHelpScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        {/* drawer navigation */}
        <TouchableOpacity style={styles.burger} onPress={this.props.navigation.toggleDrawer} >
          <Image source={hamburger} />
        </TouchableOpacity>

        {/* about information */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.title}> INTERVIEW COACH </Text>
          <Text style={styles.subtitle}>
            {' '}
            The perfect platform to help you prep for your next interview!{' '}
          </Text>
          <Text style={styles.list}> INTERVIEW SESSION </Text>
          <Text style={styles.list}>
            Start Session Button: Pressing this will start a new interview and audio recording. The coach will begin asking
            you questions.{' '}
          </Text>
          <Text style={styles.list}>
            Next Question Button: Pressing this will prompt the coach
            to give you a new interview question to answer.{' '}
          </Text>
          <Text style={styles.list}>
            End Session Button: Pressing this will end the interview and
            audio recording. Your results will then be analyzed and you will be shown your performance results.{' '}
          </Text>
          <Text style={styles.list}> PERFORMANCE RESULTS </Text>
          <Text style={styles.list}>
            Data and charts will be provided to show your usage of common filler words in your interview responses.{' '}
          </Text>
          <Text style={styles.list}>
            New Session Button: Pressing this will return you to the Interview Session screen where you can start a new interview.{' '}
          </Text>
          <Text style={styles.list}> HISTORY </Text>
          <Text style={styles.list}>
            Charts will be provided to show your usage of common filler words in your interview responses across all of the sessions you have recorded.{' '}
          </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    height: 100,
    borderRadius: 30,
  },
  title: {
    color: 'black',
    marginTop: 10,
    width: 375,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },
  subtitle: {
    color: 'black',
    marginTop: 10,
    width: 300,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
  list: {
    color: 'black',
    marginTop: 10,
    width: 350,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left',
    opacity: 0.8,
  },
  buttonContainer: {
    backgroundColor: '#bdecb6',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  burger: {
    marginTop: 10,
    alignSelf: 'flex-start',
  }
});
