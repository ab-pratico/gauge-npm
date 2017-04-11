import { GaugeDownloader } from './gauge_downloader';
import fs = require('fs');
import { options  } from './config';


describe(GaugeDownloader.name, () => {

    let downloader: GaugeDownloader;

    beforeEach(() => {
        downloader = new GaugeDownloader();
    });

    it('returns the current platform', () => {
        expect(downloader.arch).toEqual('x86_64')
    });

    it('returns the url for x64 arch', () => {
        expect(downloader.url).toEqual('https://github.com/getgauge/gauge/releases/download/v0.8.3/gauge-0.8.3-linux.x86_64.zip');
    });

    it('show download the gauge file', async () => {
        try {

            await downloader.setupGauge();
            
            fs.exists(downloader.gaugeDownloadedFile, (exists) => {
                expect(exists).toBeTruthy();
            });
        } catch (e) {
            fail(e);
        }
    }, 60000);
});