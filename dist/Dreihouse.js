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
const NoopLogger_1 = __importDefault(require("./Logger/NoopLogger"));
const ReportRunner_1 = __importDefault(require("./Report/ReportRunner"));
const ChromeStarter_1 = __importDefault(require("./ChromeStarter/ChromeStarter"));
const ConfigLoader_1 = __importDefault(require("./Config/ConfigLoader"));
const ReporterLoader_1 = __importDefault(require("./Report/ReporterLoader"));
const { version } = require('../package.json');
class Dreihouse {
    constructor(configFile, reporterNames, logger = new NoopLogger_1.default()) {
        this.logger = logger;
        this.reporterNames = reporterNames;
        this.reporters = [];
        this.config = null;
        this.chromeStarter = null;
        this.configFolder = process.cwd();
        this.logger.info(`Dreihouse v${version}`);
        try {
            this.config = ConfigLoader_1.default.load(configFile);
            this.reportFolder = this.config.folder;
            this.logger.info(`Config successfully loaded`);
        }
        catch (e) {
            this.logger.error(`Failed loading configuration`);
            throw e;
        }
        this.reporters = ReporterLoader_1.default.load(this.reportFolder, this.config, this.logger, this.reporterNames);
        this.setChromeStarter(new ChromeStarter_1.default(true, 9222, this.logger));
    }
    setChromeStarter(value) {
        this.logger.debug('Set chromestarter');
        this.chromeStarter = value;
    }
    execute(url, port = 9222) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config) {
                throw new Error('No config loaded');
            }
            let auditResults = null;
            try {
                yield this.startChrome(url);
                auditResults = yield this.audit(url, port);
            }
            catch (e) {
                this.logger.error(e.name, e.message);
                console.error(e);
                yield this.stopChrome();
                throw e;
            }
            yield this.stopChrome();
            return auditResults;
        });
    }
    startChrome(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config) {
                throw new Error('No config available');
            }
            if (!this.chromeStarter) {
                throw new Error('No chrome starter defined');
            }
            yield this.chromeStarter.setup(url, this.config.chromeFlags);
            if (this.config.preAuditScripts) {
                yield this.chromeStarter.runPreAuditScripts(this.config.preAuditScripts);
            }
            yield this.chromeStarter.closePage();
        });
    }
    stopChrome() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.chromeStarter) {
                this.logger.debug(`Stopping chrome`);
                yield this.chromeStarter.disconnect();
            }
        });
    }
    audit(url, port = 9222) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config) {
                throw new Error('No config loaded');
            }
            const { paths, disableEmulation, disableThrottling } = this.config;
            const opts = {};
            opts.disableDeviceEmulation = disableEmulation;
            opts.disableNetworkThrottling = disableThrottling;
            opts.disableCpuThrottling = disableThrottling;
            let auditPaths = paths;
            if (!Array.isArray(paths)) {
                auditPaths = [paths];
            }
            const reportPaths = [...auditPaths];
            const runner = new ReportRunner_1.default(this.logger, this.config, port, opts, this.reporters);
            this.logger.info(`Start creating reports for ${url} paths [${reportPaths.join(',')}]`);
            return yield runner.createReports(url, reportPaths);
        });
    }
    getConfig() {
        return this.config;
    }
}
exports.default = Dreihouse;
//# sourceMappingURL=Dreihouse.js.map