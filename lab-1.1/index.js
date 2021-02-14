'use strinct';

const generateSignal = require('./signal-generator');
const statistics = require('./statistics');
const Screen = require('./chart-renderer');

const chartStyle = {line: 'red', text: 'blue', baseline: 'black'};
const logStyle = {fg: 'red', label: 'Calculations'};
const params = {minY: -4, maxY: 4, numYLabels: 10};

const genarateSignalCase = () => {
  const signalHarmonics = 6;
  const frequency = 1200;
  const disRepetitions = 128;

  const signal = generateSignal(signalHarmonics, frequency, disRepetitions);
  return signal;
};

const complexityCase = (itr) => {
  let signalHarmonics = 6;
  const frequency = 1200;
  let disRepetitions = 1;

  const points = {
    x: [],
    y: [],
    setPoint(x, y) {
      this.x.push(x + '');
      this.y.push(y);
      return this;
    },
  };

  for (let i = 0; i < itr; i++) {
    const startTime = new Date().getTime();
    generateSignal(signalHarmonics, frequency, disRepetitions);
    const endTime = new Date().getTime();
    const execTime = endTime - startTime;
    points.setPoint(disRepetitions, execTime);
    disRepetitions *= 2;
  }
  return points;
};

const statisticsCase = (signal) => {
  const data = signal.y;
  const expectation = statistics.expectation(data);
  const dispersion = statistics.dispersion(expectation, data);

  return {
    expectation,
    dispersion,
  };
};

const signal = genarateSignalCase();
const complexity = complexityCase(20);
const statCalc = statisticsCase(signal);

const screen = new Screen(3)
  .addChart(chartStyle, signal, 'Random Signal', params)
  .addChart(chartStyle, complexity, 'Complexity algorithm')
  .addLogger(logStyle)
  .log(`Math expectation: ${statCalc.expectation}`)
  .log(`Math dispersion: ${statCalc.dispersion}`)
  .render();
