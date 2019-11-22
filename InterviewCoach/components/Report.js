
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryPie,
} from 'victory-native';
// const data = [{ uhm: 5, like: 7 }]; // data to use it with victoryChart
const data = [
    { x: 'uhm', y: 35 },
    { x: 'like', y: 40 },
    { x: 'smiles', y: 55 },
]; // data to use it with victoryPie
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
                <Text style={styles.title}> YOUR PERFORMANCE RESULTS </Text>
                <Text>numbers of uhms: {this.state.fillers.uhm}</Text>
                <Text>numbers of likes: {this.state.fillers.like}</Text>
                <Text>numbers of smiles: {this.state.smiles}</Text>
                <View style={styles.chartContainer}>
                    {/* <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="uhm" y="like" />
          </VictoryChart> */}
                    <VictoryPie
                        data={[
                            { x: 'uhm', y: 35 },
                            { x: 'like', y: 45 },
                            { x: 'smiles', y: 20 },
                        ]}
                        colorScale={['gold', '#B0E0E6', '#20B2AA']}
                    />
                </View>
            </View>
        );
    }
}
export default Report;
const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'black',
        marginTop: 10,
        width: 300,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        opacity: 0.8,
    },
});


// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// class Report extends React.Component {
//     constructor(){
//         super()
//         this.state = {
//             fillers: {
//                 uhm: 0,
//                 like: 0,
//             },
//             smiles: 0
//         }
//     }

//     render(){
//         return (
//             <View style={styles.container}>
//                 <Text>numbers of uhms: {this.state.fillers.uhm}</Text>
//                 <Text>numbers of likes: {this.state.fillers.like}</Text>
//                 <Text>numbers of smiles: {this.state.smiles}</Text>
//             </View>
//             );
//     }
// }

// export default Report;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


