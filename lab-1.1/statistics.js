const expectation = (data) =>
  data.reduce((acc, val) => (acc += val), 0) / data.length;

const dispersion = (mathExpectation, data) =>
  data.reduce((acc, val) => (acc += Math.pow(mathExpectation - val, 2)), 0) /
  data.length;

module.exports = {
  expectation,
  dispersion,
};
