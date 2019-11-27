import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import coach from '../components/coach.png';
import * as Speech from 'expo-speech';
import * as Permissions from 'expo-permissions';
// try commenting out 2 below:
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// recording-related
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
        this.recording = null; // recording-related
        this.sound = null;  // recording-related
        this.state = {
            sessionStarted: false,
            questions,
            currentQuestion: '',
            isRecording: false,  // recording-related
            recordingDuration: 0,  // recording-related
        }
    }

    // arrow function so that this refers to our class and not the event
    startSessionSpeak = async () => {
        // ask user for permission to record audio
        const { status } = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING
        );  // recording-related
        if (status !== 'granted') {
            alert('Hey! This App is designed around your speech please enable audio recording.');
            // recording-related
        }

        this.setState({
            sessionStarted: true,
            currentQuestion: "Welcome! Let's get started with your interview. Tell me about yourself.",
            audioPermissions: status, // recording-related
        });
        Speech.speak(this.state.currentQuestion, {
            language: 'en',
            pitch: 1.1,
            rate: .8
        });
        this._startRecording() // recording-related
    }

    nextQuestionSpeak = async () => {
        const questionIndex = Math.floor(Math.random() * (questions.length))
        this.setState({
            currentQuestion: questions[questionIndex]
        });
        // recording-related: replaced 'this.state.currentQuestion' with 'questions[questionIndex]':
        Speech.speak(questions[questionIndex], {
            language: 'en',
            pitch: 1.1,
            rate: .8
        });
    }

    // end session button click action
    // changed from endSession to endSessionSpeak per master
    endSessionSpeak = async () => {
        await this._stopRecording() // recording-related
        this.recording = null; // recording-related
        this.audio = null; // recording-related
        this.setState({
            sessionStarted: false,
            currentQuestion: 'Thanks for taking the time to interview with me. Here is your feedback.'
        });
        this.props.navigation.navigate('Report')
    }

    // recording-related
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
            // does it ever hit this line????
            console.log("-----> ending session and unloading the recorded file")
            // expo audio api method
            await this.recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing
        }
        // given
        const info = await FileSystem.getInfoAsync(this.recording.getURI());
        console.log(`-----> RECORDING FILE INFO: ${JSON.stringify(info)}`);
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
    // recording related
    recordingText: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '600',
        fontSize: 12,
    }
});
