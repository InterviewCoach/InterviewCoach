import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const questions = [
    'Tell me about yourself',
    'What is something interesting about you everyone should know?',
    'How do you work in a team?',
    'If you could be any animal which would you be?',
    'Tell me about a time you handled a difficult work situation',
    'Why should we hire you?'
]

class InSession extends React.Component {
    constructor() {
        super()
        this.state = {
            questions,
            currentQuestion: ''
        }
    }

    componentDidMount() {
        this.renderNewQuestion()
    }

    //arrow function so that this refers to our class and not the event
    renderNewQuestion = () => {
        const questionIndex = Math.floor(Math.random() * (questions.length))
        this.setState({
            currentQuestion: questions[questionIndex]
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.currentQuestion}</Text>
                <Button title="Next" onPress={this.renderNewQuestion}></Button>
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


