import React from 'react'
import Axios from 'axios'
import {Text } from 'react-native';

// component that logs a user out of our app and takes them back to the home page
export default class Logout extends React.Component {
    async componentDidMount() {
        await Axios.post('https://interview-coach-server.herokuapp.com/auth/logout')
        this.props.navigation.navigate('Home')
    }
    render() {
        return <Text>Logging Out</Text>
    }
}

