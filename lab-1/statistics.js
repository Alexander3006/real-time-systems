const expectation = (data) =>
  data.reduce((acc, val) => (acc += val), 0) / data.length;

const dispersion = (mathExpectation, data) =>
  data.reduce((acc, val) => (acc += Math.pow(mathExpectation - val, 2)), 0) /
  data.length;


const correlation = (sig1, sig2) => {
  const len = sig1.length;
  if(len !== sig2.length) throw new Error();
  const mx1 = expectation(sig1);
  const mx2 = expectation(sig2);

  const result = [];
  for (let i = 0; i < len; i++) {
    const cr = (sig1[i] - mx1) * (sig2[i]-mx2);
    result.push(cr);
  }
  return result.reduce((acc, v) => acc + v, 0) / (len - 1);
}

const autocorrelation = (sig) => {
  const mid = Math.floor(sig.length / 2);
  const sig_a = sig.slice(0, mid);
  const points = {
    x: [],
    y: [],
    setPoint(x, y) {
      this.x.push(x + '');
      this.y.push(y);
      return this;
    },
  };
  for (let tau = 0; tau < mid; tau ++) {
    const sig_b = sig.slice(tau, tau + mid);
    const corr = correlation(sig_a, sig_b);
    points.setPoint(tau, corr);
  }
  return points;
}

const dcorrelation = (sig1, sig2) => {
  const mid = Math.floor(sig1.length / 2);
  const a = sig1.slice(0, mid);
  const points = {
    x: [],
    y: [],
    setPoint(x, y) {
      this.x.push(x + '');
      this.y.push(y);
      return this;
    },
  };
  for (let tau = 0; tau < mid; tau++) {
    const b = sig2.slice(tau, tau + mid);
    const corr = correlation(a, b);
    points.setPoint(tau, corr);
  }
  return points;
} 

module.exports = {
  expectation,
  dispersion,
  correlation,
  autocorrelation,
  dcorrelation
};
