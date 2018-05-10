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
const chalk_1 = __importDefault(require("chalk"));
const LighthouseRunner_1 = __importDefault(require("../LighthouseRunner/LighthouseRunner"));
const budget_1 = require("../utils/budget");
class ReportRunner {
    constructor(logger, config, port, opts, reporters) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.logger = logger;
        this.reporters = reporters;
    }
    printResults(categories, budget) {
        return __awaiter(this, void 0, void 0, function* () {
            let allBudgetsReached = true;
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                category.score = Math.round(category.score);
                const isReached = budget_1.checkBudget(category, budget);
                let budgetText = budget_1.getScoreString(category, budget);
                if (isReached === true) {
                    budgetText = chalk_1.default.green(budgetText);
                }
                if (isReached === false) {
                    budgetText = chalk_1.default.red(budgetText);
                    allBudgetsReached = false;
                }
                this.logger.print(budgetText);
            }
            if (allBudgetsReached) {
                this.logger.print(chalk_1.default.bgGreen('Congrats! Budged reached!'));
            }
        });
    }
    runPersisters(site, results) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reporters.forEach((persister) => __awaiter(this, void 0, void 0, function* () {
                yield persister.setup();
                yield persister.handle(site, results);
            }));
        });
    }
    runReport(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, budget, report } = this.config;
            const site = url_1.resolve(url, path);
            this.logger.print(chalk_1.default.blue(`Run ${site}`));
            const runner = new LighthouseRunner_1.default();
            const results = yield runner.runReport(url, path, this.opts, report, this.port);
            const categories = results.reportCategories;
            this.printResults(categories, budget);
            yield this.runPersisters(site, results);
            return results;
        });
    }
    createReports(paths, allResults = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlPath = paths.shift();
            this.logger.print(''.padStart(10, '-'));
            if (!urlPath) {
                return Promise.resolve();
            }
            const results = yield this.runReport(urlPath);
            allResults.push(results);
            if (paths.length > 0) {
                return this.createReports(paths, allResults);
            }
            return allResults;
        });
    }
}
exports.default = ReportRunner;
