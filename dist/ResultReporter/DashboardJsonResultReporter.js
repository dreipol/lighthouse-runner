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
const AbstractResultReporter_1 = __importDefault(require("./AbstractResultReporter"));
const writeFile_1 = __importDefault(require("../utils/writeFile"));
const createFolder_1 = __importDefault(require("../utils/createFolder"));
class DashboardJsonResultReporter extends AbstractResultReporter_1.default {
    constructor() {
        super(...arguments);
        this.key = 'DashboardJsonResultReporter';
    }
    handle(url, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const { saveReport } = this.config;
            if (this.reportFolder && saveReport) {
                const json = this.generateReportJson(url, results.reportCategories.slice(0), this.config.budget, this.config.tag);
                writeFile_1.default(url, this.reportFolder, JSON.stringify(json), 'json', this.config.tag, 'dashboard');
                this.logger.print('JSON Dashboard File created');
            }
            return;
        });
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const { saveReport, folder } = this.config;
            if (!saveReport || !folder || !this.reportFolder) {
                return Promise.resolve();
            }
            if (!fs_1.existsSync(this.reportFolder)) {
                return createFolder_1.default(this.reportFolder);
            }
            return;
        });
    }
    generateReportJson(url, categories, budget, tag) {
        const cleanCategories = categories.map((item) => {
            item = Object.assign({}, item);
            delete item.audits;
            return item;
        });
        return {
            categories: cleanCategories,
            budget,
            url,
            tag,
            key: `${tag}:${url}`,
        };
    }
}
exports.default = DashboardJsonResultReporter;
