var path = require('path');

let basePath = path.join(__dirname, '../');

export const options = {
    CACHE_FOLDER: path.join(basePath, '.gauge/download_cache'),
    GAUGE_VERSION: '0.8.3',
    GAUGE_PROJECT_FOLDER: path.join(process.cwd(), 'gauge-project'),
    GAUGE_ROOT_FOLDER: path.join(basePath, '.gauge'),
    GAUGE_BINARY_FOLDER: path.join(basePath, '.gauge/runtime/gauge'),
    GAUGE_CONFIG: path.join(basePath, '.gauge/runtime/gauge/config'),
    GAUGE_BINARY: path.join(basePath, '.gauge/runtime/gauge/bin/gauge'),
    GAUGE_SCREENSHOT_BINARY: path.join(basePath, '.gauge/runtime/gauge/bin/gauge_screenshot'),
    GAUGE_HOME: path.join(basePath, '.gauge/home'),
    GAUGE_HOME_CONFIG: path.join(basePath, '.gauge/home/config'),
    GAUGE_URL_TEMPLATE_LINUX: 'https://github.com/getgauge/gauge/releases/download/v%GAUGE_VERSION%/gauge-%GAUGE_VERSION%-linux.%ARCH_STRING%.zip'
} 

