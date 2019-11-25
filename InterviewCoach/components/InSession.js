import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import coach from '../components/coach.png';
import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';

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

// Algorithms
// const questions = [
//     'Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array. For example in [3, 10, 4, 5] the longest increasing subsequence (LIS) is [3, 4, 5].',
//     'Given a target sum and an array of positive integers, return true if any combination of numbers in the array can add to the target. Each number in the array may only be used once. Return false if the numbers cannot be used to add to the target sum.',
//     'Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the "intersection") may be returned in any order, they need not be sorted. You can assume that each array has only unique values',
// ]

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
        Speech.speak(this.state.currentQuestion, {
            language: 'en',
            pitch: 1.1,
            rate: .8
        });
        this._startRecording()
    }

    nextQuestionSpeak = async () => {
        const questionIndex = Math.floor(Math.random() * (questions.length))
        this.setState({
            currentQuestion: questions[questionIndex]
        });
        Speech.speak(this.state.currentQuestion, {
            language: 'en',
            pitch: 1.1,
            rate: .8
        });
    }

    endSessionSpeak = async () => {
        await this.setState({
            currentQuestion: 'Thanks for taking the time to interview with me. Here is your feedback.'
        });
        Speech.speak(this.state.currentQuestion, {
            language: 'en',
            pitch: 1.1,
            rate: .8
        });

        this.setState({
            sessionStarted: false,
            currentQuestion: ''
        });
        this.props.navigation.navigate('Report')
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
        // expo audio api method
        await recording.prepareToRecordAsync(recordingOptions);
        // callback function for audio recording
        recording.setOnRecordingStatusUpdate(this._updateRecordingStatus);
        this.recording = recording;
        // start the recording
        // expo audio api method
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
            // expo audio api method
            await this.recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing
        }
        // given
        const info = await FileSystem.getInfoAsync(this.recording.getURI());
        console.log(`RECORDING FILE INFO: ${JSON.stringify(info)}`);
        // optional code for testing the recording
        // remove once confident that recording is record
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });
        const { sound } = await this.recording.createNewLoadedSoundAsync(
            {
                isLooping: false,
                isMuted: false,
                volume: 1.0,
                rate: 1.0,
                shouldCorrectPitch: false,
            },
        );
        this.sound = sound;
        this.sound.playAsync()
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
