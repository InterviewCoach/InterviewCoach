import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import coach from '../components/coach2.png';
import * as Speech from 'expo-speech';
// import * as Permissions  from "expo-permissions";
// import { Audio } from 'expo-av';

// Interview
const questions = [
    'What is something you have accomplished that you are proud of?',
    'What are the top 3 values that you look for in an organization?',
    'What is something interesting about you everyone should know?',
    'How do you work in a team?',
    'If you could be any animal which would you be?',
    'Tell me about a time you handled a difficult work situation.',
    'Why should we hire you?'
]

// Algorithms
// const questions = [
//     'Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array. For example in [3, 10, 4, 5] the longest increasing subsequence (LIS) is [3, 4, 5].',
//     'Given a target sum and an array of positive integers, return true if any combination of numbers in the array can add to the target. Each number in the array may only be used once. Return false if the numbers cannot be used to add to the target sum.',
//     'Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the "intersection") may be returned in any order, they need not be sorted. You can assume that each array has only unique values',
// ]

class InSession extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sessionStarted: false,
            questions,
            currentQuestion: ''
        }
    }

    componentDidMount() {
        // this.renderNewQuestion()
    }

    //arrow function so that this refers to our class and not the event
    startSessionSpeak = async () => {
        await this.setState({
            sessionStarted: true,
            currentQuestion: "Welcome! Let's get started with your interview. Tell me about yourself."
        });
        Speech.speak(this.state.currentQuestion, {
            language: 'en',
            pitch: 1.1,
            rate: .8
        });
    }

    nextQuestionSpeak = async () => {
        const questionIndex = Math.floor(Math.random() * (questions.length))
        await this.setState({
            currentQuestion: questions[questionIndex]
        });
        Speech.speak(this.state.currentQuestion, {
            language: 'en',
            pitch: 1.1,
            rate: .8
        });
    }

    endSession = () => {
        this.setState({
            sessionStarted: false,
            currentQuestion: ''
        });
        this.props.navigation.navigate('Report')
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <Text
                    style={styles.title}>
                    INTERVIEW SESSION
          </Text>
                <Image
                    style={styles.image}
                    source={coach} />
                <View>
                    <Text style={styles.question}>{this.state.currentQuestion}</Text>
                </View>

                <View>
                    {!this.state.sessionStarted ? (
                        <TouchableOpacity
                            style={styles.buttonContainer}>
                            <Text
                                style={styles.buttonText}
                                onPress={this.startSessionSpeak}
                            >START SESSION
                        </Text>
                        </TouchableOpacity>
                    ) : null}

                    {this.state.sessionStarted ? (
                        <TouchableOpacity
                            style={styles.buttonContainer}>
                            <Text
                                style={styles.buttonText}
                                onPress={this.nextQuestionSpeak}
                            >NEXT QUESTION</Text>
                        </TouchableOpacity>
                    ) : null}

                    {this.state.sessionStarted ? (
                        <TouchableOpacity
                            style={styles.buttonContainer}
                        >
                            <Text
                                style={styles.buttonText}
                                onPress={this.endSession}
                            >END SESSION</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        );
    }
}

export default InSession;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25,
    },
    title: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        width: 250,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        opacity: 0.8,
    },
    image: {
        width: 150,
        height: 150,
    },
    question: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        width: 300,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        opacity: 0.8,
    },
    buttonContainer: {
        backgroundColor: 'aqua',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
    },
});



// class InSession extends React.Component {
//     constructor(){
//         super()
//         this.state = {
//             questions,
//             currentQuestion: '',
//             isRecording: false
//         }
//     }

//     componentDidMount(){
//         //show question
//         this.renderNewQuestion()
//     }

//     startRecording = async () => {
//         const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
//         if (status !== 'granted') return;

//         this.setState({ isRecording: true });
//         // some of these are not applicable, but are required
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: true,
//           interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//           playsInSilentModeIOS: true,
//           shouldDuckAndroid: true,
//           interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//           playThroughEarpieceAndroid: true,
//           staysActiveInBackground: false
//         });

//         const recording = new Audio.Recording();
//         try {
//           await recording.prepareToRecordAsync(recordingOptions);
//           await recording.startAsync();
//         } catch (error) {
//           console.log(error);
//         //   this.stopRecording();
//         }
//         this.recording = recording;
//       }

//     async _startRecognition(e) {
//         this.setState({
//           recognized: '',
//           started: '',
//           results: [],
//         });
//         try {
//           await Voice.start('en-US');
//         } catch (e) {
//           console.error(e);
//         }
//       }

//     //arrow function so that this refers to our class and not the event
//     renderNewQuestion = () => {
//         const questionIndex = Math.floor(Math.random()*(questions.length))
//         this.setState({
//             currentQuestion: questions[questionIndex]
//         })
//     }

//     render(){
//         return (
//             <View style={styles.container}>
//                 <Text>{this.state.currentQuestion}</Text>
//                 <Button title="Next" onPress={this.renderNewQuestion}></Button>
//                 <Button title="Record" onPress={this.startRecording}></Button>
//                 <Text>{this.state.results}</Text>
//             </View>
//             );
//     }
// }

// export default InSession;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
