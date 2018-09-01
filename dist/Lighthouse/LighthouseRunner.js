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
const RunnerResultTransformer_1 = __importDefault(require("../Transformer/RunnerResultTransformer"));
const lighthouse = require('lighthouse');
class LighthouseRunner {
    constructor(logger) {
        this.logger = logger;
    }
    createAudit(targetUrl, urlPath, opts, config, port) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = url_1.resolve(targetUrl, urlPath);
            const auditResult = yield this.launchChromeAndRunLighthouse(url, opts, config, port);
            return RunnerResultTransformer_1.default.transform(auditResult);
        });
    }
    launchChromeAndRunLighthouse(url, opts, config, port) {
        return __awaiter(this, void 0, void 0, function* () {
            let results;
            try {
                if (port) {
                    opts.port = port;
                }
                opts.disableStorageReset = true;
                this.logger.debug('Start lighthouse audit');
                results = yield lighthouse(url, opts, {
                    extends: 'lighthouse:default',
                    settings: {},
                    passes: [
                        {
                            passName: 'extraPass',
                            gatherers: [
                                'js-usage',
                            ],
                        },
                    ],
                    audits: [
                        'byte-efficiency/unused-javascript',
                    ],
                    categories: {
                        'performance': {
                            auditRefs: [
                                { id: 'unused-javascript', weight: 0, group: 'load-opportunities' },
                            ],
                        },
                    },
                });
                this.logger.debug('Lighthouse audit complete');
            }
            catch (e) {
                throw e;
            }
            return results;
        });
    }
}
exports.default = LighthouseRunner;
//# sourceMappingURL=LighthouseRunner.js.map