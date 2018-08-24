import shelljs = require('shelljs');
import path = require('path');

import { options } from './config';

let args = ' ' + process.argv.splice(2).join(' ');

if (args.indexOf('--setup') > -1) {
  require('./setup');
} else {
  let gaugeProjectDir = path.join(process.cwd(), 'gauge-project');
  if (!shelljs.test('-d', gaugeProjectDir)) {
    gaugeProjectDir = './';
  }

  shelljs.exec(`${options.GAUGE_BINARY} --dir ${gaugeProjectDir}  ${args}`, {
    env: {
      PATH: process.env.PATH,
      GAUGE_ROOT: options.GAUGE_BINARY_FOLDER,
      GAUGE_HOME: options.GAUGE_HOME,
    },
  });
}
