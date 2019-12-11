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
import hamburger from '../assets/hamburgerBlack.png';

const data = [
  {
    x: 'actually',
    y: 4
  },
  {
    x: 'like',
    y: 5
  },
  {
    x: 'basically',
    y: 3
  },
  {
    x: 'other',
    y: 88,
  },
]

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotData: false,
      questionCount: 0,
      likeWordCount: 0,
      actuallyWordCount: 0,
      basicallyWordCount: 0,
      totalWordCount: 0,
    };
  }

  async componentDidMount() {
    await this.loadSessionData();
  }

  loadSessionData = async () => {
    try {
      const { data } = await axios.get(
        'https://interview-coach-server.herokuapp.com/api/sessions/latest/1'
      );
      console.log('latest', data)
      // console.log('sessions', data)
      // const dataSessionQuestionCount = data[0].questionCount;
      const dataSessionLikeWordCount = data[0].likeWordCount;
      const dataSessionActuallyWordCount = data[0].actuallyWordCount;
      const dataSessionBasicallyWordCount = data[0].basicallyWordCount;
      const dataSessionTotalWordCount = data[0].totalWordCount;
      // console.log('dataSessionQuestionCount', dataSessionQuestionCount)
      this.setState({
        gotData: true,
        // questionCount: dataSessionQuestionCount,
        likeWordCount: dataSessionLikeWordCount,
        actuallyWordCount: dataSessionActuallyWordCount,
        basicallyWordCount: dataSessionBasicallyWordCount,
        totalWordCount: dataSessionTotalWordCount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    const transcription = params.transcription
      ? params.transcription.join(' ')
      : null;
    if (!this.state.gotData)
      return <Splash message={'loading your report'} />

    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.burger} onPress={this.props.navigation.toggleDrawer}>
          <Image source={hamburger} />
        </TouchableOpacity>

        <Text style={styles.title}> PERFORMANCE RESULTS </Text>
        {/* <SafeAreaView style={styles.scrollContainer}>
          <ScrollView style={styles.scrollView}> */}
        {/* <Text style={styles.transcriptionText}>{transcription}</Text> */}

        {((this.state.actuallyWordCount +
          this.state.likeWordCount +
          this.state.basicallyWordCount) / this.state.totalWordCount) * 100
          <= 2 ?
          <View style={styles.chartContainer}>

            <Text style={styles.databold}></Text>
            <Text style={styles.databold}></Text>
            <Text style={styles.databold}></Text>

            <Text style={styles.databold}>Congratulations, your responses did not contain many common filler words:</Text>

            {/* <Text style={styles.data}>
                  # questions answered:{' '}
                  {this.state.questionCount}
                </Text> */}
            {/* <Text style={styles.databold}>
              Your results:
                </Text> */}
            <Text style={styles.data}>
              # 'actually': {this.state.actuallyWordCount}
            </Text>
            <Text style={styles.data}># 'like': {this.state.likeWordCount}</Text>
            <Text style={styles.data}>
              # 'basically': {this.state.basicallyWordCount}
            </Text>
            <Text style={styles.data}>
              # other words:{' '}
              {this.state.totalWordCount -
                (this.state.actuallyWordCount +
                  this.state.likeWordCount +
                  this.state.basicallyWordCount)}
            </Text>
            <Text style={styles.databold}>
              Other users' results:
        </Text>
            <VictoryPie
              data={data}
              labels={({ datum }) => `${datum.x}: ${datum.y}%`}
              colorScale={['gold', '#DDA0DD', '#20B2AA', '#B0E0E6']}

              padding={{ left: 100, right: 100 }}
              style={{ labels: { fontSize: 10, fill: 'black' } }}
              labelComponent={<VictoryLabel angle={325} />}
            />
          </View>
          :
          <View style={styles.chartContainer}>

            <Text style={styles.databold}>
              Your results:
                </Text>
            <Text style={styles.data}>
              # 'actually': {this.state.actuallyWordCount}
            </Text>
            <Text style={styles.data}># 'like': {this.state.likeWordCount}</Text>
            <Text style={styles.data}>
              # 'basically': {this.state.basicallyWordCount}
            </Text>
            <Text style={styles.data}>
              # other words:{' '}
              {this.state.totalWordCount -
                (this.state.actuallyWordCount +
                  this.state.likeWordCount +
                  this.state.basicallyWordCount)}
            </Text>

            <VictoryChart
              width={350}
              theme={VictoryTheme.material}
              domainPadding={15}
            >
              <VictoryAxis
                label={`Session Performance`}
                style={{ axisLabel: { padding: 100 } }}
              />
              <VictoryAxis
                dependentAxis
                label="Word Count"
                angle={325}
                style={{
                  axisLabel: { padding: 100 }
                }}
              />

              <VictoryBar
                data={[
                  { word: 1, totalWordCount: this.state.likeWordCount },
                  { word: 2, totalWordCount: this.state.actuallyWordCount },
                  { word: 3, totalWordCount: this.state.basicallyWordCount },
                ]}

                x="word"
                y="totalWordCount"
                style={{
                  data: {
                    fill: data => ('#B0E0E6'),
                  },
                }}
                categories={{
                  x: [`like`, `actually`, `basically`
                  ],

                  y: [
                    `1`,
                    `2`,
                    `3`,
                    `4`,
                    `5`,
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                  ],
                }}
              />
            </VictoryChart>

            {/* <VictoryPie
              data={[
                {
                  x: 'actually',
                  y: Math.round(
                    (this.state.actuallyWordCount / this.state.totalWordCount) *
                    100
                  ),
                },
                {
                  x: 'like',
                  y: Math.round(
                    (this.state.likeWordCount / this.state.totalWordCount) * 100
                  ),
                },
                {
                  x: 'basically',
                  y: Math.round(
                    (this.state.basicallyWordCount / this.state.totalWordCount) *
                    100
                  ),
                },
                {
                  x: 'other',
                  y: Math.round(
                    ((this.state.totalWordCount -
                      (this.state.actuallyWordCount +
                        this.state.likeWordCount +
                        this.state.basicallyWordCount)) /
                      this.state.totalWordCount) *
                    100
                  ),
                },
              ]}
              labels={({ datum }) => {
                `${datum.x}: ${datum.y}%`
              }}
              colorScale={['gold', '#B0E0E6', '#20B2AA', '#DDA0DD']}
              padding={{ left: 100, right: 100 }}
              style={{ labels: { fontSize: 10, fill: 'black' } }}
              labelComponent={<VictoryLabel angle={325} />}
            /> */}
          </View>}

        {/* </ScrollView>
        </SafeAreaView> */}
        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('New Session')}
          >
            <Text style={styles.buttonText}>NEW SESSION</Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('History')}
          >
            <Text style={styles.buttonText}>SESSION HISTORY</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}
export default Report;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  chartContainer: {
    display: "flex",
    flex: 1,
    fontSize: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 'auto',
    width: '100%'
  },
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
    textAlign: 'left',
    opacity: 0.8,
  },
  databold: {
    color: 'black',
    fontWeight: "bold",
    marginBottom: 5,
    width: 300,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
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
  transcriptionText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
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
})
