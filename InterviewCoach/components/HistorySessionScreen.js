import React from 'react';
import axios from 'axios';
import Splash from './Splash'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import Constants from 'expo-constants';
import hamburger from '../assets/hamburgerBlack.png';

// History component where a user cna see data visualizations of their past interview sessions
class HistorySessionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      got: false
    };
  }

  async componentDidMount() {
    await this.loadSessionData();
  }

  // get users history data and put it on state
  loadSessionData = async () => {
    try {
      const { data } = await axios.get(
        'https://interview-coach-server.herokuapp.com/api/sessions/latest/10'
      );
      this.setState({
        sessions: data,
        got: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    // render spalsh while getting data from backend
    if (!this.state.sessions.length && !this.state.got)
      return <Splash message={'loading your history...'} />
    
    // render graphs when data is recieved
    return (
      <View style={styles.container}>

        {/* drawer navigation */}
        <TouchableOpacity style={styles.burger} onPress={this.props.navigation.toggleDrawer}>
          <Image source={hamburger} />
        </TouchableOpacity>

        {/* Data visualization of users session history */}
        <Text style={styles.title}>SESSION HISTORY</Text>
        <SafeAreaView style={styles.scrollContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.chartContainer}>
              {this.state.sessions.map((session, idx) => {
                return (
                  <VictoryChart
                    key={session.id}
                    width={350}
                    theme={VictoryTheme.material}
                    domainPadding={15}
                  >
                    <VictoryAxis
                      label={`Session: ${session.createdAt.slice(0, 10)}`}
                      style={{ axisLabel: { padding: 35 } }}
                    />
                    <VictoryAxis
                      dependentAxis
                      label="Word Count"
                      style={{ axisLabel: { padding: 100 } }}
                    />

                    <VictoryBar
                      data={[
                        { word: 1, totalWordCount: session.likeWordCount },
                        { word: 2, totalWordCount: session.actuallyWordCount },
                        { word: 3, totalWordCount: session.basicallyWordCount },
                        ,
                      ]}

                      x="word"
                      y="totalWordCount"
                      style={{
                        data: {
                          fill: data => (idx % 2 ? 'gold' : '#B0E0E6'),
                        },
                      }}
                      categories={{
                        x: ['like', 'actually', 'basically'],
                        y: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                      }}
                    />
                  </VictoryChart>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default HistorySessionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  // chartContainer: {
  //   flex: 1,
  //   fontSize: 10,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 10,
  //   marginBottom: 10,
  // },
  title: {
    color: 'black',
    marginBottom: 10,
    width: 300,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },
  data: {
    color: 'black',
    marginBottom: 5,
    width: 300,
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'right',
    opacity: 0.8,
  },
  // buttonContainer: {
  //   marginTop: 10,
  //   backgroundColor: 'aqua',
  //   paddingVertical: 20,
  //   paddingHorizontal: 20,
  // },
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
  scrollContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  burger: {
    marginTop: 10,
    alignSelf: 'flex-start'
  }
});
