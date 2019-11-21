import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Report extends React.Component {
    constructor(){
        super()
        this.state = {
            fillers: {
                uhm: 0,
                like: 0,
            },
            smiles: 0
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>numbers of uhms: {this.state.fillers.uhm}</Text>
                <Text>numbers of likes: {this.state.fillers.like}</Text>
                <Text>numbers of smiles: {this.state.smiles}</Text>
            </View>
            );
    } 
}

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


