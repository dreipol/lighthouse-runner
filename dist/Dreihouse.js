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
const path_1 = require("path");
const fs_1 = require("fs");
const lighthouse_config_1 = require("@dreipol/lighthouse-config");
const NoopLogger_1 = __importDefault(require("./Logger/NoopLogger"));
const ReportRunner_1 = __importDefault(require("./ReportRunner/ReportRunner"));
const ReporterModuleLoader_1 = __importDefault(require("./ReporterModuleLoader/ReporterModuleLoader"));
const ChromeStarter_1 = __importDefault(require("./ChromeStarter/ChromeStarter"));
class Dreihouse {
    constructor(configFile, reporterNames, logger = new NoopLogger_1.default()) {
        this.logger = logger;
        this.reporterNames = reporterNames;
        this.reporters = [];
        this.reportFolder = '';
        this.config = null;
        this.chromeStarter = null;
        this.configFolder = process.cwd();
        if (typeof configFile === 'object' && configFile !== null) {
            this.loadConfig(configFile, process.cwd());
            return;
        }
        if (configFile === null) {
            this.loadConfig(require('../config/base.js'), process.cwd());
            return;
        }
        this.loadConfigFile(configFile);
    }
    loadConfigFile(configFile) {
        let resolveFolder = process.cwd();
        if (path_1.isAbsolute(configFile)) {
            resolveFolder = path_1.dirname(configFile);
        }
        if (!fs_1.existsSync(configFile)) {
            throw new Error(`File not found at ${configFile}`);
        }
        this.loadConfig(require(path_1.resolve(resolveFolder, configFile)), resolveFolder);
    }
    loadConfig(config, resolveFolder) {
        this.logger.print(`Validating config`);
        this.config = lighthouse_config_1.ConfigValidator.validate(config);
        this.logger.print(`Config seems valid`);
        this.reportFolder = path_1.resolve(resolveFolder, config.folder);
        if (!this.reporterNames) {
            throw new Error('Reporters are required');
        }
        this.logger.print(`Load modules for reporters ${this.reporterNames.join(',')}`);
        if (!this.config) {
            throw new Error('No config loaded');
        }
        this.reporters = ReporterModuleLoader_1.default.load(this.reportFolder, this.config, this.logger, this.reporterNames);
        this.logger.print(`${this.reporters.length} reporter modules loaded`);
    }
    setChromeStarter(value) {
        this.chromeStarter = value;
        this.logger.print('Overwrite default chromestarter');
    }
    execute(url, port = 9222) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config) {
                throw new Error('No config loaded');
            }
            yield this.startChrome(url);
            const auditResults = yield this.audit(url, port);
            yield this.stopChrome();
            return auditResults;
        });
    }
    startChrome(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config) {
                throw new Error('No config available');
            }
            this.logger.print(`Starting chrome`);
            if (!this.chromeStarter) {
                this.chromeStarter = new ChromeStarter_1.default(url, true, 9222, this.logger);
            }
            yield this.chromeStarter.setup(this.config.chromeFlags);
            if (this.config.preAuditScripts) {
                yield this.chromeStarter.runPreAuditScripts(this.config.preAuditScripts);
            }
            this.logger.print(`Starting chrome completed`);
        });
    }
    stopChrome() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.chromeStarter) {
                throw new Error('Chrome not started');
            }
            this.logger.print(`Stopping chrome`);
            yield this.chromeStarter.disconnect();
        });
    }
    audit(url, port = 9222) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.print('Start audit');
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
            this.logger.print(`Report runner created`);
            const runner = new ReportRunner_1.default(this.logger, this.config, port, opts, this.reporters);
            this.logger.print(`Start creating reports for ${url} paths [${reportPaths.join(',')}]`);
            return yield runner.createReports(url, reportPaths);
        });
    }
}
exports.default = Dreihouse;
//# sourceMappingURL=Dreihouse.js.map