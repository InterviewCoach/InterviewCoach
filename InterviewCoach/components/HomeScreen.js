import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import logo from '../components/logo.png';
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
          <Text
            onPress={() => this.props.navigation.navigate('About')}
            style={styles.title}
          >
            {' '}
            INTERVIEW COACH{' '}
          </Text>
          <Text style={styles.subtitle}>
            {' '}
            The perfect platform to prep for your next interview{' '}
          </Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            LOG IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate('About')}
          >
            LEARN MORE
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
  },
  title: {
    color: 'white',
    marginTop: 10,
    width: 250,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },
  subtitle: {
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
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