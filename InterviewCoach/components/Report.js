import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLabel,
} from 'victory-native';

class Report extends React.Component {
  constructor() {
    super();
    this.state = {
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
        'https://interview-coach-server.herokuapp.com/api/sessions/1'
      );
      // console.log('sessions', data)
      const dataSessionQuestionCount = data[0].questionCount;
      const dataSessionLikeWordCount = data[0].likeWordCount;
      const dataSessionActuallyWordCount = data[0].actuallyWordCount;
      const dataSessionBasicallyWordCount = data[0].basicallyWordCount;
      const dataSessionTotalWordCount = data[0].totalWordCount;
      // console.log('dataSessionQuestionCount', dataSessionQuestionCount)
      this.setState({
        questionCount: dataSessionQuestionCount,
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}> PERFORMANCE RESULTS </Text>
        <Text style={styles.data}>
          # of actually: {this.state.actuallyWordCount}
        </Text>
        <Text style={styles.data}># of likes: {this.state.likeWordCount}</Text>
        <Text style={styles.data}>
          # of basically: {this.state.basicallyWordCount}
        </Text>
        <Text style={styles.data}>
          # of other words:{' '}
          {this.state.totalWordCount -
            (this.state.actuallyWordCount +
              this.state.likeWordCount +
              this.state.basicallyWordCount)}
        </Text>
        <View style={styles.chartContainer}>
          {/* <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="uhm" y="like" />
          </VictoryChart> */}
          <VictoryPie
            data={[
              {
                x: 'actually',
                y: Math.round(
                  (this.state.actuallyWordCount / this.state.totalWordCount) *
                    100
                ),
              },
              {
                x: 'likes',
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
            labels={({ datum }) => `${datum.x}: ${datum.y}%`}
            colorScale={['gold', '#B0E0E6', '#20B2AA', 'grey']}
            padding={{ left: 100, right: 100 }}
            style={{ labels: { fontSize: 10, fill: 'black' } }}
            labelComponent={<VictoryLabel angle={325} />}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('InSession')}
          >
            <Text style={styles.buttonText}>NEW SESSION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Report;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    flex: 1,
    fontSize: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
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
    textAlign: 'right',
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: 'aqua',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
});
