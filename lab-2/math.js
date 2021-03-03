'use strict';
const math = require('mathjs');

const dft = (signal = []) => {
  const N = signal.length;
  const spectrum = [];
  for (let p = 0; p < N; p++) {
    let sum = math.complex();
    for (let k = 0; k < N; k++) {
      const x = signal[k];
      const arg = (2 * Math.PI * p * k) / N;
      const w = math.complex(math.cos(arg), -math.sin(arg));
      sum = math.add(sum, math.multiply(w, x));
    }
    spectrum.push(sum);
  }
  return spectrum;
};

const fft = (signal = []) => {
  const N = signal.length;
  if (N === 1) return signal;
  const spectrum = [];

  const evens = fft(signal.filter((_, i) => !(i % 2)));
  const odds = fft(signal.filter((_, i) => i % 2));

  for (let k = 0; k < N / 2; k++) {
    const x = -2 * Math.PI * (k / N);
    const root = math.complex(math.cos(x), math.sin(x));
    const e = math.multiply(root, odds[k]);
    spectrum[k] = math.add(evens[k], e);
    spectrum[k + N / 2] = math.subtract(evens[k], e);
  }
  return spectrum;
};

const complexToReal = (array) => array.map((x) => math.abs(x));

module.exports = {
  dft,
  fft,
  complexToReal,
};
