import lighthouse from 'lighthouse/lighthouse-core/index.js';
import { launch } from 'chrome-launcher';
import { resolve } from 'url';
import { LaunchedChrome as Chrome, Results } from 'lighthouse/typings/externs';


import LighthouseOptionsInterface from './Interfaces/LighthouseOptionsInterface';
import { LaunchedChrome } from './Interfaces/lib';
import LighthouseConfigInterface from './Interfaces/LighthouseConfigInterface';

/**
 * Start either a new chrome instance or get port from passed arguments
 * 
 * @param {Object} opts
 * @param {Number|null} port
 * 
 * @return {Promise}
 */
function getChromePort(opts: LighthouseOptionsInterface, port?: Number): Promise<LaunchedChrome> {
    if (port) {
        return Promise.resolve({
            port: port,
            chrome: null,
        });
    }

    return launch({ chromeFlags: opts.chromeFlags })
        .then((chrome: Chrome) => {
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
 */
function launchChromeAndRunLighthouse(_url: String, opts: LighthouseOptionsInterface, config: LighthouseConfigInterface, port?: Number): Promise<Results> {
    return getChromePort(opts, port)
        .then(({ chrome, port }) => {
            opts.port = port;

            let results: Results;

            return lighthouse(_url, opts, config)
                .then((_results: Results) => {
                    results = _results;
                    delete results.artifacts;

                    if (chrome) {
                        return chrome.kill();
                    }
                    return null;
                })
                .catch((e: Error) => {
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
export default function runReport(targetUrl: string, urlPath: string, opts: LighthouseOptionsInterface, config: LighthouseConfigInterface, port?: Number) {
    let url = resolve(targetUrl, urlPath);

    return launchChromeAndRunLighthouse(url, opts, config, port);
};