'use strict';

class VM {
  constructor(planner, quantum, cores) {
    this.planner = planner;
    this.quantum = quantum;
    this.stats = {};
    this.tick = 0;
    this.waitingTime = 0;
    this.timer;
    this.cores = cores ?? 1;
    this.processes = new Set();
    this.currentQuantum = 0;
  }

  _tick() {
    const { processes, cores } = this;
    //fill processes
    while(processes.size < cores && !!this.planner?.size()) {
      const newTask = this.planner?.get();
      processes.add(newTask);
    };
    if(!processes.size) {
      this.tick++;
      this.waitingTime++;
      return;
    }
    for (const task of processes) {
      const executedOrExpired = task.execute();
      if (executedOrExpired) {
        this.stats[this.tick] = task;
        this.processes.delete(task);
        this.currentQuantum = 0;
        return;
      }
      this.currentQuantum++;
      this.tick++;
      this.planner.wait();
      if (this.currentQuantum >= this.quantum) {
        if(!task.canAbort()) {
          this.planner.return(task);
          this.processes.delete(task);
        };
        this.currentQuantum = 0;
      }
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
