#!$(which node)

let options = require('./config');
var shelljs = require('shelljs');

shelljs.chmod('+x', options.GAUGE_BINARY);

shelljs.mkdir('-p', options.GAUGE_HOME_CONFIG);
shelljs.cp('-R', options.GAUGE_CONFIG+ '/*', options.GAUGE_HOME_CONFIG);

console.log('Initialize js plugin: ');

shelljs.exec(options.GAUGE_BINARY + ' --install js' , {
    env: {
        GAUGE_ROOT: options.GAUGE_FOLDER,
        GAUGE_HOME: options.GAUGE_HOME_CONFIG
    }
})