import * as React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import logo from '../components/logo.png';

// Home screen the user sees when they start using our app. Gives the user the options of logging in or signing up.
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLockMode: 'locked-closed',
  }

  render() {
    return (
      <View style={styles.container}>

        {/* Logo and heading */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
          <Text
            onPress={() => this.props.navigation.navigate('New Session')}
            style={styles.title}>INTERVIEW COACH
          </Text>

          <Text style={styles.subtitle}>
            The perfect platform to help you prep for your next interview!
          </Text>
        </View>

        {/* Log in button that brings the user to a Log In screen */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        {/* Sign up button that brings the user to a Sign Up screen */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 50,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 30
  },
  title: {
    color: 'black',
    marginTop: 10,
    width: 250,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },
  subtitle: {
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    backgroundColor: '#bdecb6',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
});
