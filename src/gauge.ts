import shelljs = require('shelljs');

let options = require('./dist/config');

let args = ' ' + process.argv.splice(2).join(' ');

shelljs.exec(options.GAUGE_BINARY +  args, {
    env: {
        GAUGE_ROOT: options.GAUGE_FOLDER,
        GAUGE_HOME: options.GAUGE_HOME
    }
});