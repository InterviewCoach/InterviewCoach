import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import coach from '../components/coach.png';
// import * as Permissions  from "expo-permissions";
// import { Audio } from 'expo-av';

const questions = [
    'Tell me about yourself.',
    'What is something interesting about you everyone should know?',
    'How do you work in a team?',
    'If you could be any animal which would you be?',
    'Tell me about a time you handled a difficult work situation.',
    'Why should we hire you?'
]

class InSession extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions,
            currentQuestion: '',
        }
    }

    componentDidMount() {
        // this.renderNewQuestion()
    }

    //arrow function so that this refers to our class and not the event
    startSession = () => {
        const questionIndex = Math.floor(Math.random() * (questions.length))
        this.setState({
            currentQuestion: "Welcome! Let's get started with your interview. " + questions[questionIndex]
        })
    }

    renderNewQuestion = () => {
        const questionIndex = Math.floor(Math.random() * (questions.length))
        this.setState({
            currentQuestion: questions[questionIndex]
        })
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
                <View >
                    <Text style={styles.question}>{this.state.currentQuestion}</Text>
                </View>

                <View
                >
                    <TouchableOpacity
                        style={styles.buttonContainer}
                    >
                        <Text
                            style={styles.buttonText}
                            onPress={this.startSession}
                        >
                            START SESSION
          </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                    >
                        <Text
                            style={styles.buttonText}
                            onPress={this.renderNewQuestion}
                        >
                            NEXT QUESTION
          </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                    >
                        <Text
                            style={styles.buttonText}
                            onPress={() => {
                                this.setState({
                                    currentQuestion: ''
                                });
                                this.props.navigation.navigate('Report')
                            }
                            }
                        >
                            END SESSION
          </Text>
                    </TouchableOpacity>
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
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
        width: 300,
        fontSize: 20,
        fontWeight: '500',
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
