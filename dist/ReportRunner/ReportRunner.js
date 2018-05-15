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
const LighthouseRunner_1 = __importDefault(require("../LighthouseRunner/LighthouseRunner"));
class ReportRunner {
    constructor(logger, config, port, opts, reporters) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.logger = logger;
        this.reporters = reporters;
    }
    createReports(paths, allResults = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlPath = paths.shift();
            if (!urlPath) {
                return allResults;
            }
            const results = yield this.runReport(urlPath);
            allResults.push(results);
            if (paths.length > 0) {
                return this.createReports(paths, allResults);
            }
            return allResults;
        });
    }
    runReporters(site, results) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.print(`Run ${this.reporters.length} reporters`);
            for (let i = 0; i < this.reporters.length; i++) {
                const reporter = this.reporters[i];
                if (reporter.setup) {
                    this.logger.print(`${reporter.key} setup`);
                    yield reporter.setup();
                }
                this.logger.print(`${reporter.key} process`);
                yield reporter.handle(site, results);
            }
            this.logger.print(''.padStart(10, '-'));
            this.logger.print(`Running reporters complete`);
        });
    }
    runReport(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = this.config;
            const site = url_1.resolve(url, path);
            const runner = new LighthouseRunner_1.default(this.logger);
            this.logger.print(`Create report for ${path}`);
            const results = yield runner.runReport(url, path, this.opts, this.config, this.port);
            this.logger.print(`Report for ${path} completed`);
            yield this.runReporters(site, results);
            return results;
        });
    }
}
exports.default = ReportRunner;
//# sourceMappingURL=ReportRunner.js.map