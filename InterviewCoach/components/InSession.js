import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import coach from '../components/coach.png';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
// import * as Speech from '@google-cloud/speech'
// const speech = require('@google-cloud/speech');
import { Audio } from 'expo-av';
// import axios from 'axios';
import transcribe from '../transcribe'
import * as IntentLauncher from 'expo-intent-launcher';

const recordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

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

class InSession extends React.Component {
    constructor(props) {
        super(props)
        this.recording = null;
        this.sound = null;
        this.state = {
            sessionStarted: false,
            questions,
            currentQuestion: '',
            isRecording: false,
            recordingDuration: 0,
            transcript: null
        }
    }

    //arrow function so that this refers to our class and not the event
    startSessionSpeak = async () => {
        // ask user for permission to record audio
        const { status } = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING
        );
        if (status !== 'granted') {
            alert('Hey! This App is designed around your speech please enable audio recording.');
        }

        this.setState({
            sessionStarted: true,
            currentQuestion: "Welcome! Let's get started with your interview. Tell me about yourself.",
            audioPermissions: status,
        });

        this._startRecording()
    }

    nextQuestionSpeak = async () => {
        const questionIndex = Math.floor(Math.random() * (questions.length))
        this.setState({
            currentQuestion: questions[questionIndex]
        });
    }

    endSessionSpeak = async () => {
        this.setState({
            currentQuestion: 'Thanks for taking the time to interview with me. Here is your feedback.'
        });

        this.setState({
            sessionStarted: false,
            currentQuestion: ''
        });

        this._stopRecording()
        // this.props.navigation.navigate('Report')
    }

    _startRecording = async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: false,
        });
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(recordingOptions);
        
        // callback function for audio recording
        recording.setOnRecordingStatusUpdate(this._updateRecordingStatus);
        this.recording = recording;

        // start the recording
        await recording.startAsync();
    };

    // updates the state with recording meta data
    // when recording state updates
    _updateRecordingStatus = status => {
        this.setState({
            isRecording: status.isRecording,
            recordingDuration: status.durationMillis,
        });
    };

    _stopRecording = async () => {
        try {
            console.log("ending session and unloading the recorded file")
            await this.recording.stopAndUnloadAsync();
            const info = await FileSystem.getInfoAsync(this.recording.getURI());
            const uri = await FileSystem.getContentUriAsync(info.uri)
            console.log('uri', uri)
            //play back recording
            // IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            //       data: uri.uri,
            //       flags: 1, 
            // });
        } catch (error) {}
        this.getTranscription()
    }

    getTranscription = async () => {

        try {
            const info = await FileSystem.getInfoAsync(this.recording.getURI());
            // console.log(`FILE INFO: ${JSON.stringify(info)}`);
            const uri = info.uri;
            const formData = new FormData();
            formData.append('file', {
              uri,
              type: 'audio/x-wav',
              name: 'speech2text'
            });

            // currenty is seems like it is being encryptd correctly!!
            const string = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.Base64})
      
            //the headers and json.stringify seem mandatory. 
            // I am not sure what they do but when I take it out I get a network error 
            const response = await fetch('http://192.168.1.178:8080/api/speech2', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                string
              })
            });

            // ****
            // our data is not returning the transcription
            // it's returning an object with an error 'ehostdown'
            // I think this is happening because we have not provided google credentials
            // docs: https://cloud.google.com/speech-to-text/docs/reference/libraries
            // according to these docs, it seem slike we need ot provide credentials
            // but I am unclear as to exactly where it is supposed to go
            // ***

            const data = await response.json()
            console.log('data', data)
            
            // console.log('response', await response.json())
          } catch(error) {
            console.log('There was an error', error);
          }
    }

    render() {
        return (
            <View
                style={styles.container}
            >
            <Text style={styles.title}>
                INTERVIEW SESSION
            </Text>
                <Image
                    style={styles.image}
                    source={coach} />
                <View>
                    <Text style={styles.question}>{this.state.currentQuestion}</Text>
                </View>

                <View>
                    <Text style={styles.recordingText}>{this.state.isRecording ? `Recording ${this.state.recordingDuration}` : ''}</Text>
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
                                onPress={this.endSessionSpeak}
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
    recordingText: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '600',
        fontSize: 12,
    }
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
