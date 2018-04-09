const lighthouse = require('lighthouse');
import { launch } from 'chrome-launcher';
import { resolve } from 'url';
import { LaunchedChrome as Chrome } from 'lighthouse/typings/externs';

import { LaunchedChrome, LighthouseOptionsInterface, LighthouseReportConfigInterface, LighthouseReportResultInterface } from './Interfaces';

/**
 * Start either a new chrome instance or get port from passed arguments
 *
 */
function getChromePort(opts: LighthouseOptionsInterface, port: Number | null): Promise<LaunchedChrome> {
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
 */
function launchChromeAndRunLighthouse(_url: String, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, port: Number | null): Promise<LighthouseReportResultInterface> {
    return getChromePort(opts, port)
        .then(({ chrome, port }) => {
            opts.port = port;

            let results: LighthouseReportResultInterface;

            return lighthouse(_url, opts, config)
                .then((_results: LighthouseReportResultInterface) => {
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
 */
export default function runReport(targetUrl: string, urlPath: string, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, port: Number | null): Promise<LighthouseReportResultInterface> {
    let url = resolve(targetUrl, urlPath);

    return launchChromeAndRunLighthouse(url, opts, config, port);
};
