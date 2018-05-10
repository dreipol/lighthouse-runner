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
const helper_1 = require("./utils/helper");
const ConfigValidator_1 = __importDefault(require("./Validator/ConfigValidator"));
const NoopLogger_1 = __importDefault(require("./Logger/NoopLogger"));
const ReportRunner_1 = __importDefault(require("./ReportRunner/ReportRunner"));
const ReporterModuleLoader_1 = __importDefault(require("./ReporterModuleLoader/ReporterModuleLoader"));
class Dreihouse {
    constructor(configFile, logger = new NoopLogger_1.default()) {
        this.configFile = configFile;
        this.logger = logger;
        const configFilePath = path_1.resolve(process.cwd(), this.configFile);
        logger.print(`Config file: ${this.configFile}`);
        if (!fs_1.existsSync(this.configFile)) {
            new Error(`File not found at ${this.configFile}`);
        }
        this.config = ConfigValidator_1.default.validate(require(configFilePath));
    }
    executeReport(reportFolder, port) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, paths, chromeFlags, saveReport, disableEmulation, disableThrottling } = this.config;
            const opts = {
                chromeFlags,
            };
            opts.disableDeviceEmulation = disableEmulation;
            opts.disableNetworkThrottling = disableThrottling;
            opts.disableCpuThrottling = disableThrottling;
            this.logger.print(`Run Report: ${url}`);
            this.logger.print(`Config:`, `[${chromeFlags.join(';')}]`, helper_1.coloredFlag('disableEmulation', disableEmulation), helper_1.coloredFlag('disableThrottling', disableThrottling), helper_1.coloredFlag('saveReport', saveReport));
            let reportPaths = paths;
            if (!Array.isArray(paths)) {
                reportPaths = [paths];
            }
            const reporters = ReporterModuleLoader_1.default.load(reportFolder, this.config, this.logger, this.config.persisters.modules);
            const runner = new ReportRunner_1.default(this.logger, this.config, port, opts, reporters);
            return yield runner.createReports(reportPaths);
        });
    }
    execute(port) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.print(`Using persisters: ${this.config.persisters.modules}`);
            const reportFolder = path_1.resolve(path_1.dirname(this.configFile), this.config.folder);
            return yield this.executeReport(reportFolder, port);
        });
    }
}
exports.default = Dreihouse;
