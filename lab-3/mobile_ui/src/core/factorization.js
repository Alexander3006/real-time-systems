'use strict';

const isSqrt = (numb, sqrt = Math.sqrt(numb)) => (sqrt % 1 === 0 ? sqrt : 0);

export const factorizationFermat = (
  numb,
  maxStep = Infinity,
  log = () => {},
) => {
  if (!(numb % 2)) return [2, numb / 2];
  const sqrtInt = Math.ceil(Math.sqrt(numb));
  if (sqrtInt ** 2 === numb) return [sqrtInt, sqrtInt];
  log({sqrtInt});
  let i = 0;
  while (true) {
    if (maxStep < i) throw new Error('Max iteration');
    const l = (sqrtInt + i) ** 2 - numb;
    log({i, l});
    const sqrt = isSqrt(l);
    if (!!sqrt) {
      return [sqrtInt + i + sqrt, sqrtInt + i - sqrt];
    }
    i++;
  }
};
