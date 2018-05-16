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
const NoopLogger_1 = __importDefault(require("./Logger/NoopLogger"));
const ReportRunner_1 = __importDefault(require("./ReportRunner/ReportRunner"));
const ReporterModuleLoader_1 = __importDefault(require("./ReporterModuleLoader/ReporterModuleLoader"));
const lighthouse_config_1 = require("@dreipol/lighthouse-config");
class Dreihouse {
    constructor(configFile, reporterNames, logger = new NoopLogger_1.default()) {
        this.logger = logger;
        this.reporterNames = reporterNames;
        this.reporters = [];
        this.reportFolder = '';
        this.config = null;
        let configFilePath = null;
        if (configFile) {
            configFilePath = path_1.resolve(process.cwd(), configFile);
            if (!fs_1.existsSync(configFile)) {
                throw new Error(`File not found at ${configFile}`);
            }
        }
        else {
            configFile = '../config/base.js';
            configFilePath = configFile;
        }
        this.configFile = configFile;
        this.loadConfig(require(configFilePath));
    }
    loadConfig(config) {
        this.logger.print(`Validating config`);
        this.config = lighthouse_config_1.ConfigValidator.validate(config);
        this.logger.print(`Config seems valid`);
        this.reportFolder = path_1.resolve(path_1.dirname(this.configFile), config.folder);
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
    execute(url, port = 9222) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config) {
                throw new Error('No config loaded');
            }
            const { paths, chromeFlags, disableEmulation, disableThrottling } = this.config;
            const opts = {
                chromeFlags,
            };
            opts.disableDeviceEmulation = disableEmulation;
            opts.disableNetworkThrottling = disableThrottling;
            opts.disableCpuThrottling = disableThrottling;
            let reportPaths = paths;
            if (!Array.isArray(paths)) {
                reportPaths = [paths];
            }
            this.logger.print(`Report runner created`);
            const runner = new ReportRunner_1.default(this.logger, this.config, port, opts, this.reporters);
            this.logger.print(`Start creating reports for ${url} paths [${reportPaths.join(',')}]`);
            return yield runner.createReports(url, reportPaths);
        });
    }
}
exports.default = Dreihouse;
//# sourceMappingURL=Dreihouse.js.map