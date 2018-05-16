"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const ChromeStarter_1 = __importDefault(require("../ChromeStarter/ChromeStarter"));
const lighthouse = require('lighthouse');
class LighthouseRunner {
    constructor(logger) {
        this.logger = logger;
    }
    runReport(targetUrl, urlPath, opts, config, port) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = url_1.resolve(targetUrl, urlPath);
            return yield this.launchChromeAndRunLighthouse(url, opts, config, port);
        });
    }
    launchChromeAndRunLighthouse(url, opts, config, port) {
        return __awaiter(this, void 0, void 0, function* () {
            const starter = new ChromeStarter_1.default(url, true, port, this.logger);
            let results;
            try {
                yield starter.setup(config);
                if (config.preAuditScripts) {
                    yield starter.runPreAuditScripts(config.preAuditScripts);
                }
                if (port) {
                    opts.port = port;
                }
                opts.disableStorageReset = true;
                this.logger.print('Start lighthouse audit');
                results = yield lighthouse(url, opts, config.report);
                this.logger.print('Lighthouse audit complete');
                yield starter.disconnect();
                delete results.artifacts;
            }
            catch (e) {
                yield starter.disconnect();
                throw e;
            }
            return results;
        });
    }
}
exports.default = LighthouseRunner;
//# sourceMappingURL=LighthouseRunner.js.map