'use strict'

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { DiophantineEquation } from '../core/genetics';
 
export const Genetics = () => {

    const [x1, setX1] = React.useState('');
    const [x2, setX2] = React.useState('');
    const [x3, setX3] = React.useState('');
    const [x4, setX4] = React.useState('');
    const [y, setY] = React.useState('');
    const [result, setResult] = React.useState('');

    const solve = () => {
        const input = [
            parseFloat(x1),
            parseFloat(x2),
            parseFloat(x3),
            parseFloat(x4),
            parseFloat(y),
        ]
        const result = DiophantineEquation(input, 10);
        return result;
    }

    const startCalculate = () => {
        setResult('Calculating');
        setTimeout(() => {
            const start = new Date().getTime();
            const result = solve();
            const end = new Date().getTime();
            setResult(result
                    .map((x, i) => `x${++i} = ${x} \n`)
                    .join('') + `Time: ${end - start} milliseconds`
                );
        }, 0);
      };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.inputWrap}>
                    <Input
                        style={styles.input}
                        label={'X1'}
                        onChangeText={setX1}
                    />
                </View>
                <Text> + </Text>
                <View style={styles.inputWrap}>
                    <Input
                        style={styles.input}
                        label={'X2'}
                        onChangeText={setX2}
                    />
                </View>
                <Text> + </Text>
                <View style={styles.inputWrap}>
                    <Input
                        style={styles.input}
                        label={'X3'}
                        onChangeText={setX3}
                    />
                </View>
                <Text> + </Text>
                <View style={styles.inputWrap}>
                    <Input
                        style={styles.input}
                        label={'X4'}
                        onChangeText={setX4}
                    />
                </View>
                <Text> = </Text>
                <View style={styles.inputWrap}>
                    <Input
                        style={styles.input}
                        label={'Y'}
                        onChangeText={setY}
                    />
                </View>
            </View>
            <Button type={'clear'} title={'Calculate'} onPress={startCalculate}/>
            <Text style={styles.result}>{result}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: '10%',
        justifyContent: 'center',
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    inputWrap: {
        minHeight: 15,
        flex: 1
    },
    input: {
        fontSize: 14,
        color: "#6a4595"
    },
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
})