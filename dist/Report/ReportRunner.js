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
const LighthouseRunner_1 = __importDefault(require("../Lighthouse/LighthouseRunner"));
class ReportRunner {
    constructor(logger, config, port, opts, reporters) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.logger = logger;
        this.reporters = reporters;
    }
    createReports(rootUrl, paths, allResults = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlPath = paths.shift();
            if (!urlPath) {
                return allResults;
            }
            const results = yield this.runReport(rootUrl, urlPath);
            allResults.push(results);
            if (paths.length > 0) {
                return this.createReports(rootUrl, paths, allResults);
            }
            return allResults;
        });
    }
    runReporters(site, results) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`Run ${this.reporters.length} reporters`);
            for (let i = 0; i < this.reporters.length; i++) {
                const reporter = this.reporters[i];
                if (reporter.setup) {
                    this.logger.debug(`${reporter.key} setup`);
                    yield reporter.setup();
                }
                this.logger.debug(`${reporter.key} process`);
                yield reporter.handle(site, results);
            }
            this.logger.debug(`Running reporters complete`);
        });
    }
    runReport(rootUrl, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const site = url_1.resolve(rootUrl, path);
            const runner = new LighthouseRunner_1.default(this.logger);
            this.logger.info(`Create report for ${path}`);
            const results = yield runner.createAudit(rootUrl, path, this.opts, this.config, this.port);
            this.logger.debug(`Report for ${path} completed`);
            yield this.runReporters(site, results);
            return results;
        });
    }
}
exports.default = ReportRunner;
//# sourceMappingURL=ReportRunner.js.map