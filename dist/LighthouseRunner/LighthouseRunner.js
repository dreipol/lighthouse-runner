"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const lighthouse = require('lighthouse');
const chrome_launcher_1 = require("chrome-launcher");
class LighthouseRunner {
    getChromePort(opts, port) {
        return __awaiter(this, void 0, void 0, function* () {
            if (port) {
                return {
                    port: port,
                    chrome: null,
                };
            }
            const chrome = yield chrome_launcher_1.launch({ chromeFlags: opts.chromeFlags });
            return { chrome, port: chrome.port };
        });
    }
    launchChromeAndRunLighthouse(_url, opts, config, _port) {
        return __awaiter(this, void 0, void 0, function* () {
            const { chrome, port } = yield this.getChromePort(opts, _port);
            opts.port = port;
            const results = yield lighthouse(_url, opts, config);
            delete results.artifacts;
            if (chrome) {
                yield chrome.kill();
            }
            return results;
        });
    }
    runReport(targetUrl, urlPath, opts, config, port) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = url_1.resolve(targetUrl, urlPath);
            return yield this.launchChromeAndRunLighthouse(url, opts, config, port);
        });
    }
}
exports.default = LighthouseRunner;