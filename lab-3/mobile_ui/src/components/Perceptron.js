'use strict'

import * as React from 'react';
import { Perceptron as P } from '../core/perceptron';
import { Input, Button } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';

export const Perceptron = () => {
    const [maxIterations, setMaxIteration] = React.useState(Infinity);
    const [maxTime, setMaxTime] = React.useState(0);
    const [learningRate, setLearningRate] = React.useState(0);

    const [result, setResult] = React.useState('');

    const learn = () => {
        const {w1, w2, iterations, time} = P(4, learningRate)
            .learn([[0, 6], [1, 5], [3, 3], [2, 4]], maxIterations, maxTime);
        setResult(`
            W1: ${w1}
            W2: ${w2}
            Iterations: ${iterations}
            Time: ${time} sec
        `)
    }

    return (
        <View style={styles.container}>
            <Input
              keyboardType={'numeric'}
              label={'Enter max iterations'}
              onChangeText={text => setMaxIteration(parseInt(text))}
            />
            <Input
              keyboardType={'numeric'}
              label={'Enter max time'}
              onChangeText={text => setMaxTime(parseInt(text))}
            />
            <Input
              keyboardType={'numeric'}
              label={'Enter learning rate'}
              onChangeText={text => setLearningRate(parseFloat(text))}
            />
            <Button type={'clear'} title={'Learn'} onPress={learn} />
            <Text style={styles.result}>{result}</Text>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      padding: 30,
      backgroundColor: 'rgb(31, 29, 29)',
    },
    result: {
      borderRadius: 30,
      backgroundColor: 'black',
      marginTop: '10%',
      minHeight: '20%',
      padding: '5%',
      fontSize: 20,
      textAlignVertical: 'center',
    },
  });