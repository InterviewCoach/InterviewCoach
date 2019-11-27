
import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
            questionCount: 0,
            likeWordCount: 0,
            uhmWordCount: 0,
            ahWordCount: 0,
            totalWordCount: 0,
        };
    }

    async componentDidMount() {
        await this.loadSessionData();
    }

    loadSessionData = async () => {
        try {
            const { data } = await axios.get('https://interview-coach-server.herokuapp.com/api/sessions/1')
            console.log('sessions', data)
            const dataSessionQuestionCount = data[0].questionCount
            const dataSessionLikeWordCount = data[0].likeWordCount
            const dataSessionUhmWordCount = data[0].uhmWordCount
            const dataSessionAhWordCount = data[0].ahWordCount
            const dataSessionTotalWordCount = data[0].totalWordCount
            // console.log('dataSessionQuestionCount', dataSessionQuestionCount)
            this.setState({
                questionCount: dataSessionQuestionCount,
                likeWordCount: dataSessionLikeWordCount,
                uhmWordCount: dataSessionUhmWordCount,
                ahWordCount: dataSessionAhWordCount,
                totalWordCount: dataSessionTotalWordCount,
            });

        } catch (error) {
            console.error(error)
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> PERFORMANCE RESULTS </Text>
                <Text style={styles.data}>numbers of uhms: {this.state.uhmWordCount}</Text>
                <Text style={styles.data}>numbers of likes: {this.state.likeWordCount}</Text>
                <Text style={styles.data}>numbers of ahs: {this.state.ahWordCount}</Text>
                <View style={styles.chartContainer}>
                    {/* <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="uhm" y="like" />
          </VictoryChart> */}
                    <VictoryPie
                        data={[
                            { x: 'uhm', y: 35 },
                            { x: 'like', y: 45 },
                            { x: 'ahs', y: 20 },
                        ]}
                        colorScale={['gold', '#B0E0E6', '#20B2AA']}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.buttonContainer}>
                        <Text
                            style={styles.buttonText}
                            onPress={() => this.props.navigation.navigate('InSession')}
                        >
                            NEW SESSION
          </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default Report;
const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartContainer: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
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
        textAlign: 'center',
        opacity: 0.8,
    },
    buttonContainer: {
        marginTop: 20,
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
