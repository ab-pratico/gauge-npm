let https = require('follow-redirects').https;

import * as AdmZip from 'adm-zip';
import * as shelljs from 'shelljs';

import { IncomingMessage } from 'http';

import path = require('path');
import url = require('url');
import fs = require('fs');

import { options } from './config';



export class GaugeDownloader {

    constructor() { }

    get url() {
        if (this.os === 'linux') {
            return options.GAUGE_URL_TEMPLATE_LINUX
                .replace('%GAUGE_VERSION%', options.GAUGE_VERSION)
                .replace('%GAUGE_VERSION%', options.GAUGE_VERSION)
                .replace('%ARCH_STRING%', this.arch);
        }
    }

    get arch(): string {
        let arch = process.arch;

        if (arch === 'x64') {
            return 'x86_64'
        } else {
            return 'x86'
        }
    }

    get os() {
        return process.platform;
    }

    async setupGauge() {
        return this.download()
            .then(this.unzipGauge.bind(this))
            .then(this.copyConfig.bind(this))
            .then(this.giveExecutionPermission.bind(this))
            .then(this.installGaugeJsPlugin.bind(this));
    }

    private giveExecutionPermission() {
        return new Promise<void>((resolve, reject) => {
            try {
                shelljs.chmod('+x', options.GAUGE_BINARY);
                resolve();
            } catch(e) {
                reject(e);
            }
        });
    }

    private copyConfig() {
        shelljs.cp('-R', options.GAUGE_CONFIG + '/*', options.GAUGE_HOME_CONFIG);
        return Promise.resolve();
    }

    private installGaugeJsPlugin() {
        return new Promise<void>((resolve, reject) => {
            shelljs.exec(`${options.GAUGE_BINARY} --install js`, {
                async: true,
                env: {
                    GAUGE_HOME: options.GAUGE_HOME,
                    GAUGE_ROOT: options.GAUGE_FOLDER
                },

            }, (code: number, stdout: string, stderr: string) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error('code: ' + stderr));
                }
            });
        });
    }

    private unzipGauge() {
        return new Promise<void>((resolve, reject) => {
            let admZip = new AdmZip(this.gaugeDownloadedFile);
            admZip.extractAllToAsync(options.GAUGE_FOLDER, true, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    private download() {
        return new Promise<void>((resolve, reject) => {
            fs.exists(this.gaugeDownloadedFile, async (exists) => {
                if (exists) {
                    resolve()
                } else {
                    await this.execute_download();
                    resolve();
                }
            });
        });

    }
    get gaugeDownloadedFile() {
        return path.join(options.CACHE_FOLDER, `gauge-${options.GAUGE_VERSION}.zip`);
    }
    private async execute_download() {
        return new Promise<string>((resolve, reject) => {
            let req = https.get(this.url, (res: IncomingMessage) => {
                if (res.statusCode === 200) {
                    let file = fs.createWriteStream(this.gaugeDownloadedFile);
                    res.pipe(file);
                    res.on('end', () => {
                        resolve(this.gaugeDownloadedFile);
                    });
                } else {
                    reject(new Error(`Error downloading gauge, Status Code: ${res.statusCode}`))
                }
            });
            req.end();
            req.on('error', (e) => {
                reject(e);
            });
        });
    }
}