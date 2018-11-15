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
const fs_1 = require("fs");
const AbstractReporter_1 = __importDefault(require("../AbstractReporter"));
const createFolder_1 = __importDefault(require("../../utils/createFolder"));
const writeFile_1 = __importDefault(require("../../utils/writeFile"));
const DashboardResultValidator_1 = __importDefault(require("../../Validator/DashboardResultValidator"));
const DashboardResultTransformer_1 = __importDefault(require("../../Transformer/DashboardResultTransformer"));
class DashboardJsonResultReporter extends AbstractReporter_1.default {
    constructor() {
        super(...arguments);
        this.key = 'DashboardJsonResultReporter';
    }
    handle(url, results) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reportFolder) {
                try {
                    const json = DashboardResultTransformer_1.default.transform(url, results.categoryGroups.slice(0), this.config.budget, this.config.tag);
                    DashboardResultValidator_1.default.validate(json);
                    const filename = writeFile_1.default(url, this.reportFolder, JSON.stringify(json), 'json', this.config.tag, 'dashboard');
                    this.logger.debug(`Json Dashboard created ${filename}`);
                    return {
                        key: this.key,
                        value: filename,
                    };
                }
                catch (e) {
                    this.logger.error(e.message);
                }
            }
            else {
                this.logger.error(`Json Dashboard not exported. Report folder not defined`);
            }
            return;
        });
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const { folder } = this.config;
            if (!folder || !this.reportFolder) {
                return Promise.resolve();
            }
            if (!fs_1.existsSync(this.reportFolder)) {
                return createFolder_1.default(this.reportFolder);
            }
            return;
        });
    }
}
exports.default = DashboardJsonResultReporter;
//# sourceMappingURL=DashboardJsonResultReporter.js.map