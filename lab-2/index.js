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

const chartStyle = {line: 'red', text: 'blue', baseline: 'black'};

new Screen(3)
  .addChart(chartStyle, signal, 'Random Signal', {minY: -4, maxY: 4})
  .addChart(chartStyle, {x: signal.x, y: dftSpectrum}, 'DFT')
  .addChart(chartStyle, {x: signal.x, y: fftSpectrum}, 'FFT')
  .render();
