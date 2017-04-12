import shelljs = require('shelljs');
import path = require('path');

import { options } from './config';

let args = ' ' + process.argv.splice(2).join(' ');

shelljs.exec(`${options.GAUGE_BINARY} --dir gauge-project  ${args}`, {
    env: {
        PATH: process.env.PATH,
        GAUGE_ROOT: options.GAUGE_BINARY_FOLDER,
        GAUGE_HOME: options.GAUGE_HOME
    }
});