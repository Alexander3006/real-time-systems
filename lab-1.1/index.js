'use strinct';

const generateSignal = require('./signal-generator');
const statistics = require('./statistics');
const Screen = require('./chart-renderer');

const chartStyle = {line: 'red', text: 'blue', baseline: 'black'};
const logStyle = {fg: 'red', label: 'Calculations'};
const params = {minY: -1, maxY: 1, numYLabels: 20};

const genarateSignalCase = () => {
  const signalHarmonics = 6;
  const frequency = 1200;
  const disRepetitions = 1024;

  const signal = generateSignal(signalHarmonics, frequency, disRepetitions);
  return signal;
};

const complexityCase = (itr) => {
  const signalHarmonics = 2;
  const frequency = 1200;
  let disRepetitions = 2;

  const points = {
    x: [],
    y: [],
    setPoint(x, y) {
      this.x.push(x);
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
    i++;
  }
  return points;
};

const statisticsCase = (sig) => {
  const signalHarmonics = 6;
  const frequency = 1200;
  const disRepetitions = 1024;

  const signal =
    sig ?? generateSignal(signalHarmonics, frequency, disRepetitions);
  const data = signal.y;
  const expectation = statistics.expectation(data);
  const dispersion = statistics.dispersion(expectation, data);

  return {
    expectation,
    dispersion,
  };
};

const signal = genarateSignalCase();
const complexity = complexityCase(40);
const statCalc = statisticsCase(signal);

const screen = new Screen(3)
  .addChart(chartStyle, signal, 'Random Signal', params)
  .addChart(chartStyle, complexity, 'Complexity algorithm')
  .addLogger(logStyle)
  .log(`Math expectation: ${statCalc.expectation}`)
  .log(`Math dispersion: ${statCalc.dispersion}`)
  .render();
