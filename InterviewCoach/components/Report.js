import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryPie,
} from 'victory-native';
const data = [
    { x: 'uhm', y: 35 },
    { x: 'like', y: 40 },
    { x: 'smiles', y: 55 },
]; // data to use it with victoryPie

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fillers: {
                uhm: 5,
                like: 3,
            },
            smiles: 2,
        };
    }

    render() {
        const { params } = this.props.navigation.state;
        const transcription = params.transcription ? params.transcription.join(' ') : null;

        return (
            <View style={styles.container}>
                <Text style={styles.title}> PERFORMANCE RESULTS </Text>
                <Text style={styles.transcriptionText}>{transcription}</Text>
                <Text style={styles.data}>numbers of uhms: {this.state.fillers.uhm}</Text>
                <Text style={styles.data}>numbers of likes: {this.state.fillers.like}</Text>
                <Text style={styles.data}>numbers of smiles: {this.state.smiles}</Text>
                <View style={styles.chartContainer}>
                    <VictoryPie
                        data={[
                            { x: 'uhm', y: 35 },
                            { x: 'like', y: 45 },
                            { x: 'smiles', y: 20 },
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
    transcriptionText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '600',
        fontSize: 18,
    },
});

