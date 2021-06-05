'use strict';

const BasePlanner = require('./BasePlanner');

class FIFO extends BasePlanner {
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
    this.heap.push(task);
    return this;
  }
}

module.exports = FIFO;
