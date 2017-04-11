var path = require('path');

export const options = {
    CACHE_FOLDER: path.join(process.cwd(), '.gauge/download_cache'),
    GAUGE_VERSION: '0.8.3',
    GAUGE_ROOT_FOLDER: path.join(process.cwd(), '.gauge'),
    GAUGE_BINARY_FOLDER: path.join(process.cwd(), '.gauge/runtime/gauge'),
    GAUGE_CONFIG: path.join(process.cwd(), '.gauge/runtime/gauge/config'),
    GAUGE_BINARY: path.join(process.cwd(), '.gauge/runtime/gauge/bin/gauge'),
    GAUGE_HOME: path.join(process.cwd(), '.gauge/home'),
    GAUGE_HOME_CONFIG: path.join(process.cwd(), '.gauge/home/config'),
    GAUGE_URL_TEMPLATE_LINUX: 'https://github.com/getgauge/gauge/releases/download/v%GAUGE_VERSION%/gauge-%GAUGE_VERSION%-linux.%ARCH_STRING%.zip'
} 

