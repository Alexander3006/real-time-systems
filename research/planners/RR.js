'use strict';

const BasePlanner = require('./BasePlanner');

class RR extends BasePlanner {
  constructor() {
    super();
  }

  add(task) {
    this.heap.unshift(task);
    return this;
  }

  get() {
    return this.heap.pop();
  }

  return(task) {
    this.heap.unshift(task);
    return this;
  }
}

module.exports = RR;
