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
const path_1 = require("path");
const helpers_1 = require("./helpers");
const AbstractResultReporter_1 = __importDefault(require("./AbstractResultReporter"));
class HTMLDashboardResultReporter extends AbstractResultReporter_1.default {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const { saveReport, folder } = this.config;
            if (!saveReport || !folder || !this.reportFolder) {
                return;
            }
            if (!fs_1.existsSync(this.reportFolder)) {
                return helpers_1.createFolder(this.reportFolder);
            }
            return Promise.resolve();
        });
    }
    generateReportHtml(url, categories, budget) {
        const shrinkedCategories = categories.map((item) => {
            return item.score;
        });
        const shrinkedBudget = categories.map((item) => {
            return budget[item.id] ? budget[item.id] : null;
        });
        const categoryNames = categories.map((item) => {
            return item.name;
        });
        let content = helpers_1.readFile(path_1.resolve(__dirname, '../../Templates/dashboard.html'));
        const options = {
            data: {
                columns: [
                    ['Report', ...shrinkedCategories],
                    ['Budget', ...shrinkedBudget],
                ],
                type: "bar",
                labels: true
            },
            axis: {
                x: {
                    type: "category",
                    categories: categoryNames
                },
                y: {
                    show: false,
                    label: "Score",
                    max: 100,
                    min: 0,
                    top: 0,
                    bottom: 0
                }
            },
            legend: {
                show: false
            },
            color: {
                pattern: ["#607D8B", "#66bb6a"],
            },
            size: {
                height: 340
            },
            bindto: '#chart'
        };
        content = content.replace('INJECT_URL', url);
        return content.replace('INJECT_CONFIG', JSON.stringify(options));
    }
    handle(url, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const { saveReport } = this.config;
            if (this.reportFolder && saveReport) {
                const html = this.generateReportHtml(url, results.reportCategories, this.config.budget);
                helpers_1.writeFile(url, this.reportFolder, html, 'html', this.config.tag, 'dashboard');
                this.logger.print('HTML Dashboard File created');
            }
        });
    }
}
exports.default = HTMLDashboardResultReporter;
