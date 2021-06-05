'use strict';

const {RR, EDF, FIFO} = require('./planners');
const Task = require('./Task');
const VM = require('./VM');

const Screen = require('../lab-1/chart-renderer');
const chartStyle = {line: 'red', text: 'blue', baseline: 'black'};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const run = async (Planner, intensity, quantum, maxComplexity) => {
  const planner = new Planner();
  const vm = new VM(planner, quantum);
  vm.start();
  const interval = setInterval(() => {
    const complexity = random(1, maxComplexity);
    const deadline = random(complexity, maxComplexity * 10);
    vm.addTask(new Task(complexity, deadline));
  }, 1000 / intensity);
  await new Promise((res) => {
    setTimeout(() => {
      clearInterval(interval), vm.stop();
      res();
    }, 5000);
  });
  return vm;
};

const intensityTest = async (Planner) => {
  const avgTaskWait = {};
  const VMWait = {};
  const avgQueueSize = {};
  for (let i = 10; i <= 50; i += 10) {
    const vm = await run(Planner, i, 5, 20);
    const {stats, waitingTime} = vm;
    const tasks = Object.values(stats);
    const avgWaitingTime =
      tasks.reduce((acc, task) => (acc += task.waitingTime), 0) / tasks.length;
    avgTaskWait[i] = avgWaitingTime;
    VMWait[i] = waitingTime;
    avgQueueSize[i] = vm.planner?.heap?.length;
    console.dir({
      planner: Planner.name,
      intensity: i,
      expired: tasks.filter((task) => !task.executed).length / tasks.length,
    });
  }
  return {
    planner: Planner.name,
    avgTaskWait,
    VMWait,
    avgQueueSize,
  };
};

(async () => {
  const reports = await Promise.all(
    [RR, EDF, FIFO].map((planner) => intensityTest(planner)),
  ).then((reports) =>
    reports.map(({planner, avgTaskWait, VMWait, avgQueueSize}) => ({
      planner,
      avgTaskWait: {
        x: Object.keys(avgTaskWait),
        y: Object.values(avgTaskWait),
      },
      VMWait: {
        x: Object.keys(VMWait),
        y: Object.values(VMWait),
      },
      avgQueueSize: {
        x: Object.keys(avgQueueSize),
        y: Object.values(avgQueueSize),
      },
    })),
  );

  const screen = new Screen(reports.length * 3);
  reports.map(({planner, avgTaskWait, VMWait, avgQueueSize}) => {
    screen
      .addChart(chartStyle, avgTaskWait, `Avg task wait ${planner}`)
      .addChart(chartStyle, VMWait, `VM waiting time ${planner}`)
      .addChart(chartStyle, avgQueueSize, `Avg queue size ${planner}`);
  });
  screen.render();
})();
