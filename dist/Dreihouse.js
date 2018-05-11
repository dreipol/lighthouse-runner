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
const ConfigValidator_1 = __importDefault(require("./Validator/ConfigValidator"));
const NoopLogger_1 = __importDefault(require("./Logger/NoopLogger"));
const ReportRunner_1 = __importDefault(require("./ReportRunner/ReportRunner"));
const ReporterModuleLoader_1 = __importDefault(require("./ReporterModuleLoader/ReporterModuleLoader"));
class Dreihouse {
    constructor(configFile, reporterNames, logger = new NoopLogger_1.default()) {
        this.configFile = configFile;
        this.logger = logger;
        const configFilePath = path_1.resolve(process.cwd(), this.configFile);
        if (!fs_1.existsSync(this.configFile)) {
            throw new Error(`File not found at ${this.configFile}`);
        }
        this.logger.print(`Validating ${configFilePath}`);
        this.config = ConfigValidator_1.default.validate(require(configFilePath));
        this.logger.print(`Config seems valid`);
        this.reportFolder = path_1.resolve(path_1.dirname(this.configFile), this.config.folder);
        if (!reporterNames) {
            throw new Error('Reporters are required');
        }
        this.logger.print(`Load modules for reporters ${reporterNames.join(',')}`);
        this.reporters = ReporterModuleLoader_1.default.load(this.reportFolder, this.config, this.logger, reporterNames);
        this.logger.print(`Reporer modules loaded`);
    }
    execute(port = 9222) {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.logger.print(`Start creating reports for ${this.config.url} paths [${reportPaths.join(',')}]`);
            return yield runner.createReports(reportPaths);
        });
    }
}
exports.default = Dreihouse;
