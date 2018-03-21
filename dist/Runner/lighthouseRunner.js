"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lighthouse = require('lighthouse');
const chrome_launcher_1 = require("chrome-launcher");
const url_1 = require("url");
function getChromePort(opts, port) {
    if (port) {
        return Promise.resolve({
            port: port,
            chrome: null,
        });
    }
    return chrome_launcher_1.launch({ chromeFlags: opts.chromeFlags })
        .then((chrome) => {
        return { chrome, port: chrome.port };
    });
}
function launchChromeAndRunLighthouse(_url, opts, config, port) {
    return getChromePort(opts, port)
        .then(({ chrome, port }) => {
        opts.port = port;
        let results;
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
function runReport(targetUrl, urlPath, opts, config, port) {
    let url = url_1.resolve(targetUrl, urlPath);
    return launchChromeAndRunLighthouse(url, opts, config, port);
}
exports.default = runReport;
;
