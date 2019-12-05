import React from 'react'
import Axios from 'axios'
import {Text } from 'react-native';


export default class Logout extends React.Component {
    async componentDidMount() {
        await Axios.post('https://interview-coach-server.herokuapp.com/auth/logout')
        this.props.navigation.navigate('Home')
    }
    render() {
        return <Text>Logging Out</Text>
    }
}

