import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import coach from '../components/coach.png';
import * as Speech from 'expo-speech';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
// import * as Speech from '@google-cloud/speech'
// const speech = require('@google-cloud/speech');
import { Audio } from 'expo-av';
// import transcribe from '../transcribe';
// import * as IntentLauncher from 'expo-intent-launcher';

const recordingOptions = {
  android: {
    extension: '.amr',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_NB,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
    sampleRate: 8000,
    numberOfChannels: 1,
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

// Algorithms
// const questions = [
//     'Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array. For example in [3, 10, 4, 5] the longest increasing subsequence (LIS) is [3, 4, 5].',
//     'Given a target sum and an array of positive integers, return true if any combination of numbers in the array can add to the target. Each number in the array may only be used once. Return false if the numbers cannot be used to add to the target sum.',
//     'Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the "intersection") may be returned in any order, they need not be sorted. You can assume that each array has only unique values',
// ]

class InSession extends React.Component {
  constructor(props) {
    super(props);

    this.recording = null;
    this.sound = null;
    this.state = {
      sessionStarted: false,
      questions: [],
      currentQuestion: '',
      isRecording: false,
      recordingDuration: 0,
      transcript: null,
      questionCount: 1
    };
  }

  componentDidMount() {
    this.loadQuestions();
  }

  loadQuestions = async () => {
    try {
      const { data } = await axios.get(
        'https://interview-coach-server.herokuapp.com/api/questions'
      );
      // console.log('questions', data)
      const dataQuestions = data.map(question => {
        return question.content;
      });
      // console.log('data Questions', dataQuestions)
      this.setState({ questions: dataQuestions });
    } catch (error) {
      console.error(error);
    }
  };

  //arrow function so that this refers to our class and not the event
  startSessionSpeak = async () => {
    // ask user for permission to record audio
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert(
        'Hey! This App is designed around your speech please enable audio recording.'
      );
    }
    this.setState({
      sessionStarted: true,
      currentQuestion:
        "Welcome! Let's get started with your interview. Tell me about yourself.",
      audioPermissions: status,
    });
    Speech.speak(this.state.currentQuestion, {
      language: 'en',
      pitch: 1.1,
      rate: 0.9,
    });
    this._startRecording();
  };

  nextQuestionSpeak = async () => {
    const questionIndex = Math.floor(
      Math.random() * this.state.questions.length
    );
    await this.setState({
      currentQuestion: this.state.questions[questionIndex],
      questionCount: this.state.questionCount ++
    });
    Speech.speak(this.state.currentQuestion, {
      language: 'en',
      pitch: 1.1,
      rate: 0.9,
    });
  };

  endSessionSpeak = async () => {
    await this.setState({
      currentQuestion:
        'Thanks for taking the time to interview with me. Here is your feedback.',
    });
    Speech.speak(this.state.currentQuestion, {
      language: 'en',
      pitch: 1.1,
      rate: 0.9,
    });
    const transcription = await this._stopRecording();
    this.props.navigation.navigate('Report', {
      transcription: transcription,
    });
    this.setState({
      sessionStarted: false,
      currentQuestion: '',
      questionCount: 1
    });
  };

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
      console.log('ending session and unloading the recorded file');
      await this.recording.stopAndUnloadAsync();
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      const uri = await FileSystem.getContentUriAsync(info.uri);
      console.log('uri', uri);
      // uncomment if you want to debug to see if your phone/emulator is recording
      // play back recording
      // await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
      //     data: uri.uri,
      //     flags: 1,
      // });
    } catch (error) {
      console.error('error!!', error);
    }
    const transcription = await this.getTranscription();
    return transcription;
  };

  getTranscription = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      // console.log(`FILE INFO: ${JSON.stringify(info)}`);
      const uri = info.uri;
      // currenty is seems like it is being encryptd correctly!!
      const string = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const { data } = await axios.post('https://interview-coach-server.herokuapp.com/api/sessions', { string, audioFileURI: uri })
      this.setState({
        transcription: data,
        questionCount: this.state.questionCount
      });
      return data;
    } catch (error) {
      console.log('There was an error getting transcription', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.menu} title='menu' onPress={this.props.navigation.toggleDrawer}/>
        <Text style={styles.title}>INTERVIEW SESSION</Text>
        <Image style={styles.image} source={coach} />
        <View>
          <Text style={styles.question}>{this.state.currentQuestion}</Text>
        </View>
        <View>
          {/* <Text style={styles.transcriptionText}>
            {this.state.transcription
              ? `${this.state.transcription.join(' ')}`
              : ''}
          </Text> */}
          <Text style={styles.recordingText}>
            {this.state.isRecording
              ? `Recording ${this.state.recordingDuration}`
              : ''}
          </Text>
          {!this.state.sessionStarted ? (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.startSessionSpeak}
            >
              <Text style={styles.buttonText}>START SESSION</Text>
            </TouchableOpacity>
          ) : null}
          {this.state.sessionStarted ? (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.nextQuestionSpeak}
            >
              <Text style={styles.buttonText}>NEXT QUESTION</Text>
            </TouchableOpacity>
          ) : null}
          {this.state.sessionStarted ? (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.endSessionSpeak}
            >
              <Text style={styles.buttonText}>END SESSION</Text>
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
  },
  transcriptionText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  }
});

