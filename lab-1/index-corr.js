'use strict'

const generateSignal = require("./signal-generator");
const statistics = require('./statistics');
const Screen = require('./chart-renderer');

const chartStyle = {line: 'red', text: 'blue', baseline: 'black'};
const params = {minY: -2, maxY: 2, numYLabels: 10};

const signalHarmonics = 6;
const frequency = 1200;
const disRepetitions = 256;

const autocorrelationCase = () => {
    const sig = generateSignal(signalHarmonics, frequency, disRepetitions);
    const autocorr = statistics.autocorrelation(sig.y);
    return autocorr;
}

const crosscorrelationCase = () => {
    const sig1 = generateSignal(signalHarmonics, frequency, disRepetitions);
    const sig2 = generateSignal(signalHarmonics, frequency, disRepetitions);
    const crosscorr = statistics.dcorrelation(sig1.y, sig2.y);
    return crosscorr;
}

const autocorr = autocorrelationCase();
const crosscorr = crosscorrelationCase();

const screen = new Screen(2)
  .addChart(chartStyle, autocorr, 'Auto correlation', params)
  .addChart(chartStyle, crosscorr, 'Cross correlation', params)
  .render();
