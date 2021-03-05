'use strict';

const generateSignal = require('../lab-1/signal-generator');
const {dft, fft, complexToReal} = require('./math');
const Screen = require('../lab-1/chart-renderer');

const signalHarmonics = 6;
const frequency = 1200;
const disRepetitions = 128;

const signal = generateSignal(signalHarmonics, frequency, disRepetitions);
const dftSpectrum = complexToReal(dft(signal.y));
const fftSpectrum = complexToReal(fft(signal.y));

const measure = (testedFunc, testedParams = [], iterations = 1) => {
  const report = {
    x: [],
    y: [],
    setPoint(x, y) {
      this.x.push(x);
      this.y.push(y);
      return this;
    },
  };
  testedParams.map((param) => {
    const startTime = new Date().getTime();
    for (let i = 0; i < iterations; i++) {
      testedFunc(param);
    }
    const endTime = new Date().getTime();
    const time = endTime - startTime;
    report.setPoint(param, time);
  });
  return report;
};

//Генерація сигналів довжиною 2^1 .. 2^11(FFT підтримує обрахунки сишналів, довжина, яких становить 2^n)
const testedParams = new Array(12)
  .fill(0)
  .map((_, i) => generateSignal(signalHarmonics, frequency, Math.pow(2, i)).y);
const dftTime = measure(
  (signal) => complexToReal(dft(signal)),
  testedParams,
  5,
);
const fftTime = measure(
  (signal) => complexToReal(fft(signal)),
  testedParams,
  5,
);

const chartStyle = {line: 'red', text: 'blue', baseline: 'black'};

new Screen(5)
  .addChart(chartStyle, signal, 'Random Signal', {minY: -4, maxY: 4})
  .addChart(chartStyle, {x: signal.x, y: dftSpectrum}, 'DFT')
  .addChart(chartStyle, {x: signal.x, y: fftSpectrum}, 'FFT')
  .addChart(
    chartStyle,
    {x: dftTime.x.map((_) => _.length + ''), y: dftTime.y},
    'DFT',
  )
  .addChart(
    chartStyle,
    {x: fftTime.x.map((_) => _.length + ''), y: fftTime.y},
    'FFT',
  )
  .render();
