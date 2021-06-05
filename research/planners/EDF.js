const BasePlanner = require('./BasePlanner');

class EDF extends BasePlanner {
  constructor() {
    super();
  }

  add(task) {
    this.heap.push(task);
    return this;
  }

  get() {
    const task = this.heap
      .sort((a, b) => b.getTimeToDeadline() - a.getTimeToDeadline())
      .pop();
    return task;
  }

  return(task) {
    this.heap.push(task);
    return this;
  }
}

module.exports = EDF;
