'use strict';

class Task {
  constructor(complexity, deadline, priority, blocking) {
    this.complexity = complexity;
    this.process = complexity;
    this.waitingTime = 0;
    this.priority = priority ?? 0;
    this.deadline = deadline ?? Infinity;
    this.executed = false;
    this.blocking = blocking ?? false;
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

  canAbort() {
    return !this.blocking;
  }
}

module.exports = Task;
