import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const questions = [
    'Tell me about yourself', 
    'What is something interesting about you everyone should know?',
    'How do you work in a team?',
    'If you could be any aminal which would you be?',
    'Tell me about a time you handled a difficult work situation',
    'Why should we hire you?'
]

class InSession extends React.Component {
    constructor(){
        super()
        this.state = {
            questions,
            currentQuestion: ''
        }
    }

    componentDidMount(){
        this.renderNewQuestion()
    }

    renderNewQuestion(){
        const questionIndex = Math.floor(Math.random()*(questions.length))
        this.setState({
            currentQuestion: questions[questionIndex]
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>{this.state.currentQuestion}</Text>
            </View>
            );
    } 
}

export default InSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


