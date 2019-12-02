// import React from 'react';
// import axios from 'axios';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import {
//   VictoryBar,
//   VictoryChart,
//   VictoryTheme,
//   VictoryAxis,
// } from 'victory-native';
// import Constants from 'expo-constants';

// import BarChart from './BarChart';

// const data = [
//   { word: 1, totalWordCount: 4 },
//   { word: 2, totalWordCount: 2 },
//   { word: 3, totalWordCount: 5 },
//   { word: 4, totalWordCount: 2 },
// ];

// const sessions = [
//   {
//     id: 1,
//     date: '2019-11-14',
//     questionCount: 10,
//     likeWordCount: 10,
//     uhmWordCount: 5,
//     ahWordCount: 10,
//     totalWordCount: 100,
//     userId: 1,
//   },
//   {
//     id: 11,
//     date: '2019-11-24',
//     questionCount: 10,
//     likeWordCount: 5,
//     uhmWordCount: 2,
//     ahWordCount: 5,
//     totalWordCount: 100,
//     userId: 1,
//   },
//   {
//     id: 12,
//     date: '2019-11-25',
//     questionCount: 5,
//     likeWordCount: 5,
//     uhmWordCount: 5,
//     ahWordCount: 5,
//     totalWordCount: 100,
//     userId: 1,
//   },
// ];

// class HistorySessionScreen extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       sessions: [{
//         id: 1,
//         questionCount: 10,
//         likeWordCount: 10,
//         actuallyWordCount: 5,
//         basicallyWordCount: 10,
//         totalWordCount: 100,
//       },{
//         id: 11,
//         questionCount: 10,
//         likeWordCount: 5,
//         actuallyWordCount: 2,
//         basicallyWordCount: 5,
//         totalWordCount: 100,
//       },{
//         id: 12,
//         questionCount: 5,
//         likeWordCount: 5,
//         actuallyWordCount: 5,
//         basicallyWordCount: 5,
//         totalWordCount: 100,
//       }],
//   }

//   async componentDidMount() {
//     await this.loadSessionData();
//   }

//   loadSessionData = async () => {
//     try {
//       const { data } = await axios.get(
//         'https://interview-coach-server.herokuapp.com/api/sessions'
//       );
//       // console.log('sessions', data)
//       const dataSessionQuestionCount = data[0].questionCount;
//       const dataSessionLikeWordCount = data[0].likeWordCount;
//       const dataSessionUhmWordCount = data[0].uhmWordCount;
//       const dataSessionAhWordCount = data[0].ahWordCount;
//       const dataSessionTotalWordCount = data[0].totalWordCount;
//       // console.log('dataSessionQuestionCount', dataSessionQuestionCount)
//       this.setState({
//         questionCount: dataSessionQuestionCount,
//         likeWordCount: dataSessionLikeWordCount,
//         uhmWordCount: dataSessionUhmWordCount,
//         ahWordCount: dataSessionAhWordCount,
//         totalWordCount: dataSessionTotalWordCount,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}> YOUR SESSION'S PERFORMANCE</Text>
//         <SafeAreaView style={styles.scrollContainer}>
//           <ScrollView style={styles.scrollView}>
//             <BarChart />
//             <View style={styles.chartContainer}>
//               <VictoryChart
//                 width={350}
//                 theme={VictoryTheme.material}
//                 domainPadding={15}
//               >
//                 <VictoryAxis
//                   // tickValues={/* your tick values here */}
//                   label="Session 1"
//                   style={{ axisLabel: { padding: 35 } }}
//                 />
//                 <VictoryAxis
//                   dependentAxis
//                   label="Word Count"
//                   style={{ axisLabel: { padding: 35 } }}
//                 />
//                 <VictoryBar
//                   data={data}
//                   x="word"
//                   y="totalWordCount"
//                   style={{ data: { fill: '#9932CC' } }}
//                   categories={{
//                     x: [`uhms`, `likes`, `ahs`, `other`],
//                     y: [`5`, `10`, `15`, `20`, `25`],
//                   }}
//                 />
//               </VictoryChart>
//               <VictoryChart
//                 width={350}
//                 theme={VictoryTheme.material}
//                 domainPadding={15}
//               >
//                 <VictoryAxis
//                   // tickValues={/* your tick values here */}
//                   label="Session 2"
//                   style={{ axisLabel: { padding: 35 } }}
//                 />
//                 <VictoryAxis
//                   dependentAxis
//                   label="Word Count"
//                   style={{ axisLabel: { padding: 35 } }}
//                 />
//                 <VictoryBar
//                   data={data}
//                   x="word"
//                   y="totalWordCount"
//                   style={{ data: { fill: '#00FF7F' } }}
//                   categories={{
//                     x: [`uhms`, `likes`, `ahs`, `other`],
//                     y: [`5`, `10`, `15`, `20`, `25`],
//                   }}
//                 />
//               </VictoryChart>
//               <VictoryChart
//                 width={350}
//                 theme={VictoryTheme.material}
//                 domainPadding={15}
//               >
//                 <VictoryAxis
//                   // tickValues={/* your tick values here */}
//                   label="Session 3"
//                   style={{ axisLabel: { padding: 35 } }}
//                 />
//                 <VictoryAxis
//                   dependentAxis
//                   label="Word Count"
//                   style={{ axisLabel: { padding: 35 } }}
//                 />
//                 <VictoryBar
//                   data={data}
//                   x="word"
//                   y="totalWordCount"
//                   style={{ data: { fill: '#FFA500' } }}
//                   categories={{
//                     x: [`uhms`, `likes`, `ahs`, `other`],
//                     y: [`5`, `10`, `15`, `20`, `25`],
//                   }}
//                 />
//               </VictoryChart>
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//         <View>
//           <TouchableOpacity style={styles.buttonContainer}>
//             <Text
//               style={styles.buttonText}
//               onPress={() => this.props.navigation.navigate('InSession')}
//             >
//               NEW SESSION
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }
// export default HistorySessionScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   chartContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   title: {
//     color: 'black',
//     marginBottom: 10,
//     width: 300,
//     fontSize: 20,
//     fontWeight: '700',
//     textAlign: 'center',
//     opacity: 0.8,
//   },
//   data: {
//     color: 'black',
//     marginBottom: 5,
//     width: 300,
//     fontSize: 10,
//     fontWeight: '500',
//     textAlign: 'right',
//     opacity: 0.8,
//   },
//   buttonContainer: {
//     marginTop: 10,
//     backgroundColor: 'aqua',
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   scrollContainer: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   scrollView: {
//     backgroundColor: '#fff',
//     marginHorizontal: 5,
//   },
// });
