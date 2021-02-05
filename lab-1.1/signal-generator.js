'use strict';

const generateSignal = (signalHarmonics, frequency, disRepetitions) => {
  const minW = frequency / signalHarmonics;
  const signalPoints = {
    x: [],
    y: [],
    setPoint(x, y) {
      this.x.push(x);
      this.y.push(y);
      return this;
    },
  };
  for (let i = 1; i <= signalHarmonics; i++) {
    const wi = minW * signalHarmonics;
    const amplitude = Math.random();
    const phase = Math.random();
    for (let t = 0; t < disRepetitions; t++) {
      const x = amplitude * Math.sin(wi * t + phase);
      signalPoints.setPoint(t, x);
    }
  }
  return signalPoints;
};

module.exports = generateSignal;
