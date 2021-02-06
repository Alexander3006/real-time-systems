'use strict';

const generateSignal = (signalHarmonics, frequency, disRepetitions) => {
  const minW = frequency / signalHarmonics;
  const signalPoints = {
    points: {},
    setPoint(x, y) {
      let ay = this.points[x] ?? 0;
      ay += y;
      this.points[x] = ay;
      return this;
    },
    getPoints() {
      const x = Object.keys(this.points);
      const y = Object.values(this.points);
      return {x, y};
    },
  };
  for (let i = 1; i <= signalHarmonics; i++) {
    const wi = minW * i;
    const amplitude = Math.random();
    const phase = Math.random();
    for (let t = 0; t < disRepetitions; t++) {
      const x = amplitude * Math.sin(wi * t + phase);
      signalPoints.setPoint(t, x);
    }
  }
  return signalPoints.getPoints();
};

module.exports = generateSignal;
