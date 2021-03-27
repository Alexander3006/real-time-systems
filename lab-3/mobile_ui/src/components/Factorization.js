'use strict';

import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {factorizationFermat} from '../core/factorization';

export const Factorization = () => {
  const [inputNumber, onChangeInputNumber] = React.useState(0);
  const [maxIterations, onChangeMaxIteration] = React.useState(10000000);
  const [result, setResult] = React.useState('');

  const startCalculate = () => {
    setResult('Calculating');
    setTimeout(() => {
      try {
        const [a, b] = factorizationFermat(inputNumber, maxIterations);
        setResult(`${a} * ${b} = ${inputNumber}`);
      } catch {
        setResult(`More than ${maxIterations} iterations required`);
      }
    }, 0);
  };

  return (
    <View style={styles.container}>
      <>
        <Input
          style={styles.input}
          keyboardType={'numeric'}
          label={'Enter number for factorization'}
          onChangeText={text => onChangeInputNumber(parseInt(text))}
        />
        <Input
          style={styles.input}
          keyboardType={'numeric'}
          label={'Enter max iterations'}
          onChangeText={text => onChangeMaxIteration(Math.abs(parseInt(text)))}
        />
        <Button type={'clear'} title={'Calculate'} onPress={startCalculate} />
        <Text style={styles.result}>{result}</Text>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 30,
    backgroundColor: 'rgb(31, 29, 29)',
  },
  input: {},
  result: {
    borderRadius: 30,
    backgroundColor: 'black',
    marginTop: '10%',
    minHeight: '20%',
    padding: '5%',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
