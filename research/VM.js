'use strict';

class VM {
  constructor(planner, quantum) {
    this.planner = planner;
    this.quantum = quantum;
    this.stats = {};
    this.tick = 0;
    this.waitingTime = 0;
    this.timer;
    this.currentTask;
    this.currentQuantum = 0;
  }

  _tick() {
    this.currentTask = this.currentTask ?? this.planner?.get();
    const task = this.currentTask;
    if (!task) {
      this.tick++;
      this.waitingTime++;
      return;
    }
    const executedOrExpired = task.execute();
    if (executedOrExpired) {
      this.stats[this.tick] = task;
      this.currentTask = null;
      this.currentQuantum = 0;
      return;
    }
    this.currentQuantum++;
    this.tick++;
    this.planner.wait();
    if (this.currentQuantum >= this.quantum) {
      this.planner.return(task);
      this.currentTask = null;
      this.currentQuantum = 0;
    }
  }

  addTask(task) {
    this.planner.add(task);
    return this;
  }

  start() {
    this.timer = setInterval(() => this._tick(), 0);
    return this;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    return this;
  }
}

module.exports = VM;
