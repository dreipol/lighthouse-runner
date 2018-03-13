const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const url = require('url');

/**
 * Start either a new chrome instance or get port from passed arguments
 * 
 * @param {Object} opts
 * @param {Number|null} port
 * 
 * @return {Promise}
 */
function getChromePort(opts, port) {
    if (port) {
        return Promise.resolve({
            port: port,
            chrome: null,
        });
    }

    return chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
        .then(chrome => {
            return { chrome, port: chrome.port };
        });
}

/**
 * Start and run lighthouse
 *
 * @param {string} _url
 * @param {Object} opts
 * @param {Object} config
 * @param {Number|null} port
 * 
 * @return {Promise|any|*|PromiseLike<{chrome?: *, port: *}>|Promise<{chrome?: *, port: *}>}
 */
function launchChromeAndRunLighthouse(_url, opts, config, port) {
    return getChromePort(opts, port)
        .then(({ chrome, port }) => {
            opts.port = port;

            let results = {};
            return lighthouse(_url, opts, config)
                .then((_results) => {
                    results = _results;
                    delete results.artifacts;

                    if (chrome) {
                        return chrome.kill();
                    }
                    return null;
                })

                .catch((e) => {
                    if (!chrome) {
                        throw e;
                    }

                    return chrome.kill()
                        .then(() => {
                            throw e;
                        });
                })
                .then(() => results);
        });
}


/**
 * Run single report for given url
 *
 * @param {string} urlPath
 * @param {Object} opts
 * @param {Object} config
 * @param {Number} port
 * 
 * @return {Promise<Array>}
 */
module.exports = function runReport(targetUrl, urlPath, opts, config, port) {
    let _url = url.resolve(targetUrl, urlPath);

    return launchChromeAndRunLighthouse(_url, opts, config, port)
        .then(results => {
            return results;
        });
};