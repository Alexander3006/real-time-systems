'use strict';

class BasePlanner {
  constructor() {
    this.heap = [];
  }

  add(task) {
    throw new Error();
  }

  get() {
    throw new Error();
  }

  wait() {
    this.heap.forEach((task) => task.wait());
    return this;
  }

  return(task) {
    throw new Error();
  }

  size() {
    return this.heap.length;
  }
}

module.exports = BasePlanner;
