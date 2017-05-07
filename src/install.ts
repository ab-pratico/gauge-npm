import shelljs = require('shelljs');

import * as fs from 'fs';

import { options } from './config';
import { GaugeDownloader } from './gauge_downloader';

let downloader = new GaugeDownloader();

if (!shelljs.test('-d', options.GAUGE_HOME_CONFIG)) {
    shelljs.mkdir('-p', options.GAUGE_HOME_CONFIG);
}

if (!shelljs.test('-d', options.CACHE_FOLDER)) {
    shelljs.mkdir('-p', options.CACHE_FOLDER);
}


(async function () {

    await downloader.setupGauge().then(() => {
        console.log('Initialize js plugin: ');
        shelljs.exec(options.GAUGE_BINARY + ' --install js', {
            env: {
                GAUGE_ROOT: options.GAUGE_BINARY_FOLDER,
                GAUGE_HOME: options.GAUGE_HOME
            }
        }, (code) => {
            if (code == 0) {
                console.log('Removing cached file.')
                shelljs.rm('-Rf', options.CACHE_FOLDER);
                console.log('Gauge package installed!');
            }
        })
    });
})();
