import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import coach from './coach.png';
import * as Speech from 'expo-speech';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import hamburger from './hamburgerBlack.png';

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

// In session compoment where a user can practice for their upcoming interview
class InSession extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: null,
      sessionStarted: false,
      questions: [],
      currentQuestion: 'Hi, I am Jolie, your interview coach! Press START SESSION to start a new interview and audio recording. I will then begin asking you questions.',
      isRecording: false,
      recordingDuration: 0,
      transcript: null,
      questionCount: 1
    };
  }

  // On component mount, load questions and speak the intro
  componentDidMount() {
    this.loadQuestions();
    Speech.speak(this.state.currentQuestion, {
      language: 'en',
      pitch: 1.1,
      rate: 0.9,
    });
  }

  loadQuestions = async () => {
    try {
      const { data } = await axios.get(
        'https://interview-coach-server.herokuapp.com/api/questions'
      );
      const questions = data.map(question => {
        return question.content;
      });
      this.setState({ questions });
    } catch (error) {
      console.error(error);
    }
  };

  startSessionSpeak = async () => {
    // get audio permissions
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert(
        'Hey! This App is designed around your speech please enable audio recording.'
      );
    }

    // set state accordingly
    this.setState({
      sessionStarted: true,
      currentQuestion:
        "Let's get started with your interview. Tell me about yourself.",
      audioPermissions: status,
    });

    //sart speaking the first question
    Speech.speak(this.state.currentQuestion, {
      language: 'en',
      pitch: 1.1,
      rate: 0.9,
    });

    // start recording
    this._startRecording();
  };

  // find next question, set it to state, and speak it
  nextQuestionSpeak = async () => {
    const questionIndex = Math.floor(
      Math.random() * this.state.questions.length
    );

    this.setState({
      currentQuestion: this.state.questions[questionIndex],
      questionCount: this.state.questionCount++
    });

    Speech.speak(this.state.currentQuestion, {
      language: 'en',
      pitch: 1.1,
      rate: 0.9,
    });
  };

  endSessionSpeak = async () => {
    //set state to outro
    this.setState({
      currentQuestion:
        'Thanks for taking the time to interview with me. Here is your feedback.',
    });

    //speak outro
    Speech.speak(this.state.currentQuestion, {
      language: 'en',
      pitch: 1.1,
      rate: 0.9,
    });

    //reset state
    this.setState({
      sessionStarted: false,
      currentQuestion: '',
      questionCount: 1
    });

    // stop recording
    await this._stopRecording();

    // get transcription
    await this.getTranscription();

    //navigate to report
    this.props.navigation.navigate('Report')
  }

  _startRecording = async () => {

    // set recording options
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    });

    // declare new recording device
    const recording = new Audio.Recording();

    // prepare for recording
    await recording.prepareToRecordAsync(recordingOptions);

    // set recording update options
    recording.setOnRecordingStatusUpdate(this._updateRecordingStatus);

    // put recording on state
    this.setState({ recording })

    // start recording
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
      await this.state.recording.stopAndUnloadAsync();
    } catch (error) {
      console.error('error!!', error);
    }
  };

  getTranscription = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      const string = await FileSystem.readAsStringAsync(info.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await axios.post('https://interview-coach-server.herokuapp.com/api/sessions', { string, audioFileURI: uri })
    } catch (error) {
      console.log('There was an error getting transcription', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>

        {/* drawer navigation */}
        <TouchableOpacity style={styles.burger} onPress={this.props.navigation.toggleDrawer}>
          <Image source={hamburger} />
        </TouchableOpacity>

        {/* title, logo, and current question*/}
        <Text style={styles.title}>INTERVIEW SESSION</Text>
        <Image style={styles.image} source={coach} />
        <View>
          <Text style={styles.question}>{this.state.currentQuestion}</Text>
        </View>

        <View>
          {/* recording information */}
          <Text style={styles.recordingText}>
            {this.state.isRecording
              ? `Recording ${this.state.recordingDuration}`
              : ''}
          </Text>

          {/* button to start session */}
          {!this.state.sessionStarted ? (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.startSessionSpeak}
            >
              <Text style={styles.buttonText}>START SESSION</Text>
            </TouchableOpacity>
          ) : null}

          {/* button to render next question */}
          {this.state.sessionStarted ? (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.nextQuestionSpeak}
            >
              <Text style={styles.buttonText}>NEXT QUESTION</Text>
            </TouchableOpacity>
          ) : null}

          {/* button to end session */}
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
  },
  title: {
    color: 'black',
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
    borderRadius: 15
  },
  question: {
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    backgroundColor: '#bdecb6',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  recordingText: {
    textAlign: 'center',
    color: '#77dd77',
    fontWeight: '600',
    fontSize: 12,
  },
  transcriptionText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
  burger: {
    marginTop: 10,
    alignSelf: 'flex-start'
  }
});