import shelljs = require('shelljs');

import { options } from './config';
import { GaugeDownloader } from './gauge_downloader';

let downloader = new GaugeDownloader();

shelljs.mkdir('-p', options.GAUGE_HOME_CONFIG);
downloader.setupGauge().then(() => {
    console.log('Initialize js plugin: ');
    shelljs.exec(options.GAUGE_BINARY + ' --install js', {
        env: {
            GAUGE_ROOT: options.GAUGE_FOLDER,
            GAUGE_HOME: options.GAUGE_HOME
        }
    })
});