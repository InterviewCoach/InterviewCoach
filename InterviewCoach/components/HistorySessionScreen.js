import React from 'react';
import axios from 'axios';
import Splash from './Splash'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
  Image
} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryPie,
  VictoryLabel,
} from 'victory-native';
import Constants from 'expo-constants';
import hamburger from './hamburgerBlack.png';

class HistorySessionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      // colors: ['gold', '#B0E0E6', '#20B2AA', '#DDA0DD'],
    };
  }
  async componentDidMount() {
    await this.loadSessionData();
  }

  loadSessionData = async () => {
    try {
      const { data } = await axios.get(
        'https://interview-coach-server.herokuapp.com/api/sessions/latest/10'
      );
      console.log('sessions data->', data);

      this.setState({
        sessions: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    if (!this.state.sessions.length)
      return <Splash message={'loading your history...'}/>
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.burger} onPress={this.props.navigation.toggleDrawer}>
          <Image source={hamburger} />
        </TouchableOpacity>

        <Text style={styles.title}>SESSION HISTORY</Text>
        <SafeAreaView style={styles.scrollContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.chartContainer}>
              {this.state.sessions.map((session, idx) => {
                return (
                  // <VictoryPie
                  //   key={session.id}
                  //   data={[
                  //     {
                  //       x: 'actually',
                  //       y: Math.round(
                  //         (session.actuallyWordCount / session.totalWordCount) *
                  //         100
                  //       ),
                  //     },
                  //     {
                  //       x: 'like',
                  //       y: Math.round(
                  //         (session.likeWordCount / session.totalWordCount) * 100
                  //       ),
                  //     },
                  //     {
                  //       x: 'basically',
                  //       y: Math.round(
                  //         (session.basicallyWordCount / session.totalWordCount) *
                  //         100
                  //       ),
                  //     },
                  //     {
                  //       x: 'other',
                  //       y: Math.round(
                  //         ((session.totalWordCount -
                  //           (session.actuallyWordCount +
                  //             session.likeWordCount +
                  //             session.basicallyWordCount)) /
                  //           session.totalWordCount) *
                  //         100
                  //       ),
                  //     },
                  //   ]}
                  //   labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                  //   colorScale={['gold', '#B0E0E6', '#20B2AA', '#DDA0DD']}
                  //   padding={{ left: 100, right: 100 }}
                  //   style={{ labels: { fontSize: 10, fill: 'black' } }}
                  //   labelComponent={<VictoryLabel angle={325} />}
                  // />

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
                        {
                          word: 4,
                          totalWordCount:
                            session.totalWordCount -
                            (session.actuallyWordCount +
                              session.likeWordCount +
                              session.basicallyWordCount),
                        },
                      ]}
                      x="word"
                      y="totalWordCount"
                      style={{
                        data: {
                          fill: data => (idx % 2 ? 'gold' : 'purple'),
                        },
                      }}
                      categories={{
                        x: [`like`, `actually`, `basically`, `other`],
                        y: [
                          `10`,
                          `20`,
                          `30`,
                          `40`,
                          `50`,
                          '60',
                          '70',
                          '80',
                          '90',
                          '100',
                        ],
                      }}
                    />
                  </VictoryChart>

                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
        {/* <View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.buttonText}
              onPress={() => this.props.navigation.navigate('InSession')}
            >
              NEW SESSION
            </Text>
          </TouchableOpacity>
        </View> */}
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
