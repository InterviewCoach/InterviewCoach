import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import Constants from 'expo-constants';

const sessions = [
  {
    id: 1,
    date: '2019-11-14',
    questionCount: 10,
    likeWordCount: 6,
    uhmWordCount: 2,
    ahWordCount: 15,
    other: 79,
    totalWordCount: 100,
    userId: 1,
  },
  {
    id: 11,
    date: '2019-11-24',
    questionCount: 10,
    likeWordCount: 5,
    uhmWordCount: 2,
    ahWordCount: 5,
    other: 88,
    totalWordCount: 100,
    userId: 1,
  },
  {
    id: 12,
    date: '2019-11-25',
    questionCount: 5,
    likeWordCount: 5,
    uhmWordCount: 5,
    ahWordCount: 5,
    other: 85,
    totalWordCount: 100,
    userId: 1,
  },
];

const data = [
  { word: 1, totalWordCount: 4 },
  { word: 2, totalWordCount: 2 },
  { word: 3, totalWordCount: 5 },
  { word: 4, totalWordCount: 2 },
];

let values = [];
let dataSession = [];
let sessionN = 1;

function BarChart(sessions) {
  for (let i = 0; i < sessions.length; i++) {
    let session = sessions[i];

    let worldCountObj = [
      {
        likeWordCount: session.likeWordCount,
        uhmWordCount: session.uhmWordCount,
        ahWordCount: session.ahWordCount,
        other: session.other,
      },
    ];

    for (let [key, value] of Object.entries(worldCountObj[0])) {
      let eachValue = value;

      values.push(eachValue);
    }
    for (let i = 0; i < data.length; i++) {
      data[i] = { word: i + 1, totalWordCount: values[i] };
      dataSession.push(data[i]);
    }
    sessionN++;
    values = [];
  }
  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        width={350}
        theme={VictoryTheme.material}
        domainPadding={15}
      >
        <VictoryAxis
          label={`Session ${sessionN}`}
          style={{ axisLabel: { padding: 35 } }}
        />
        <VictoryAxis
          dependentAxis
          label="Word Count"
          style={{ axisLabel: { padding: 35 } }}
        />
        {dataSession.map(bar => (
          <VictoryBar
            key={bar.word}
            data={dataSession}
            x={`${bar.word}`}
            y={`${bar.totalWordCount}`}
            style={{ data: { fill: '#9932CC' } }}
            categories={{
              x: [`uhms`, `likes`, `ahs`, `other`],
              y: [`5`, `10`, `15`, `20`, `25`],
            }}
          />
        ))}
      </VictoryChart>
    </View>
  );
}

export default BarChart;

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
  scrollContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
});