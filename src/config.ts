var path = require('path');

export const options = {
    CACHE_FOLDER: path.join(__dirname, '../', 'download_cache'),
    GAUGE_VERSION: '0.8.3',
    GAUGE_FOLDER: path.join(__dirname, '../gauge'),
    GAUGE_CONFIG: path.join(__dirname, '../gauge/config'),
    GAUGE_HOME_CONFIG: path.join(__dirname, '../.gauge/config'),
    GAUGE_BINARY: path.join(__dirname, '../gauge/bin/gauge'),
    GAUGE_HOME: path.join(__dirname, '../.gauge'),
    GAUGE_URL_TEMPLATE_LINUX: 'https://github.com/getgauge/gauge/releases/download/v%GAUGE_VERSION%/gauge-%GAUGE_VERSION%-linux.%ARCH_STRING%.zip'
} 

