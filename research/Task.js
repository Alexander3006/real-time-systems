'use strict';

class Task {
  constructor(complexity, deadline, priority) {
    this.complexity = complexity;
    this.process = complexity;
    this.waitingTime = 0;
    this.priority = priority ?? 0;
    this.deadline = deadline ?? Infinity;
    this.executed = false;
  }

  execute() {
    if (this.process <= 0) throw new Error();
    this.process--;
    if (this.process === 0) this.executed = true;
    return this.executed || this.isExpired();
  }

  wait() {
    this.waitingTime++;
    return;
  }

  isExpired() {
    const {deadline, process, waitingTime} = this;
    const time = process + waitingTime;
    return deadline <= time;
  }

  getTimeToDeadline() {
    const {deadline, process, waitingTime} = this;
    const remnant = deadline - process - waitingTime;
    return remnant;
  }
}

module.exports = Task;
