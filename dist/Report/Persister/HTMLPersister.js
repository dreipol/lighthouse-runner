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
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
class HTMLPersister extends AbstractReporter_1.default {
    constructor() {
        super(...arguments);
        this.key = 'HTMLResultPersister';
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const { folder } = this.config;
            if (!folder || !this.reportFolder) {
                return;
            }
            if (!fs_1.existsSync(this.reportFolder)) {
                return yield createFolder_1.default(this.reportFolder);
            }
            return Promise.resolve();
        });
    }
    handle(url, results) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reportFolder) {
                const html = ReportGenerator.generateReportHtml(results.lhr);
                const filename = writeFile_1.default(url, this.reportFolder, html, 'html', this.config.tag);
                this.logger.debug(`HTML report created ${filename}`);
            }
        });
    }
}
exports.default = HTMLPersister;
//# sourceMappingURL=HTMLPersister.js.map