import React from 'react'
import Axios from 'axios'
import {Text } from 'react-native';


export default class Logout extends React.Component {
    render() {
        await Axios.post('https://interview-coach-server.herokuapp.com/auth/logout')
        this.props.navigation.navigate('Home')
        return <Text>Logging Out</Text>
    }
}

