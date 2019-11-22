import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Permissions  from "expo-permissions";
import { Audio } from 'expo-av';



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
            currentQuestion: '',
            isRecording: false
        }
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this); 
    }

    componentDidMount(){
        //show question
        this.renderNewQuestion()
    }
    onSpeechStart(e) {
        this.setState({
        started: '√',
        });
    }
    onSpeechRecognized(e) {
        this.setState({
        recognized: '√',
        });
    }
    onSpeechResults(e) {
        this.setState({
            answer: e.value,
        });
    }
    startRecording = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') return;
      
        this.setState({ isRecording: true });
        // some of these are not applicable, but are required
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: true,
          staysActiveInBackground: false
        });

        const recording = new Audio.Recording();
        try {
          await recording.prepareToRecordAsync(recordingOptions);
          await recording.startAsync();
        } catch (error) {
          console.log(error);
        //   this.stopRecording();
        }
        this.recording = recording;
        console.log('state', this.state)
      }

    async _startRecognition(e) {
        this.setState({
          recognized: '',
          started: '',
          results: [],
        });
        try {
          await Voice.start('en-US');
        } catch (e) {
          console.error(e);
        }
      }

    //arrow function so that this refers to our class and not the event
    renderNewQuestion = () => {
        const questionIndex = Math.floor(Math.random()*(questions.length))
        this.setState({
            currentQuestion: questions[questionIndex]
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>{this.state.currentQuestion}</Text>
                <Button title="Next" onPress={this.renderNewQuestion}></Button>
                <Button title="Record" onPress={this.startRecording}></Button>
                <Text>{this.state.results}</Text>
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


