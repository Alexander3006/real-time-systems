'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');

const Screen = class {
  constructor(size) {
    this.screen = blessed.screen();
    this.grid = new contrib.grid({
      rows: size,
      cols: 1,
      screen: this.screen,
    });
    this.logger;
    this.lineCount = 0;
  }

  addChart(style, data, title, params = {}) {
    const line = this.grid.set(this.lineCount, 0, 1, 1, contrib.line, {
      style: style,
      showLegend: data.title ? true : false,
      wholeNumbersOnly: false,
      label: title ?? '',
      ...params,
    });
    line.setData([data]);
    this.lineCount++;
    return this;
  }

  addLogger(style) {
    this.logger = this.grid.set(this.lineCount, 0, 1, 1, contrib.log, style);
    this.lineCount++;
    return this;
  }

  log(data) {
    this.logger.log('>> ' + data);
    return this;
  }

  render() {
    this.screen.render();
    return this;
  }
};

module.exports = Screen;
