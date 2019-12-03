import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import logo from '../components/logo.png';
export default class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  async createAccount(email, password) {
    try {
      if (this.state.password.length < 6) {
        alert('Please enter a password with at least 6 characters');
        return;
      }
      await axios.post(
        'https://interview-coach-server.herokuapp.com/api/users',
        { email, password }
      );
    } catch (error) {
      console.error(error);
    }
    alert('Created account with Email: ' + this.state.email);
    this.setState({
      email: '',
      password: '',
    });
    this.props.navigation.navigate('InSession');
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.title}>INTERVIEW COACH</Text>
          <Text style={styles.subtitle}>
            Let's practice for your next interview. You got this!
          </Text>
          <View style={styles.formContainer} />
        </View>
        <TextInput
          placeholder="Email"
          placeholderTextColor="black"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={email => this.setState({ email })}
          ref={input => (this.emailInput = input)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          onChangeText={password => this.setState({ password })}
          ref={input => (this.passwordInput = input)}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            this.createAccount(this.state.email, this.state.password)
          }
        >
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    padding: 10,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 120,
    height: 120,
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
    width: 200,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
  input: {
    height: 60,
    backgroundColor: 'white',
    opacity: 0.5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: 'aqua',
    paddingVertical: 15,
    marginBottom: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
});
