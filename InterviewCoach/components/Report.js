import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const data = [{ uhm: 5, like: 3 }];

class Report extends React.Component {
  constructor() {
    super();
    this.state = {
      fillers: {
        uhm: 5,
        like: 3,
      },
      smiles: 2,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>numbers of uhms: {this.state.fillers.uhm}</Text>
        <Text>numbers of likes: {this.state.fillers.like}</Text>
        <Text>numbers of smiles: {this.state.smiles}</Text>
        <View style={styles.chartContainer}>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="uhm" y="like" />
          </VictoryChart>
        </View>
      </View>
    );
  }
}

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
