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
const AbstractReporter_1 = __importDefault(require("../AbstractReporter"));
const chalk_1 = __importDefault(require("chalk"));
const figures = require('figures');
require('console.table');
class CLIReporter extends AbstractReporter_1.default {
    constructor() {
        super(...arguments);
        this.key = 'CLIReporter';
    }
    handle(url, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = results.reportCategories;
            const { budget } = this.config;
            this.logger.debug(`Report: ${url}`);
            yield this.printResults(url, categories, budget);
        });
    }
    checkBudget(caregory, budget) {
        const { id, score } = caregory;
        const threshhold = budget[id];
        if (threshhold === undefined || threshhold === null) {
            return null;
        }
        return score >= threshhold;
    }
    printResults(url, categories, budget) {
        return __awaiter(this, void 0, void 0, function* () {
            let allBudgetsReached = true;
            const results = [];
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                category.score = Math.round(category.score);
                const isReached = this.checkBudget(category, budget);
                let budgetText = category.score.toString();
                let status = figures.line;
                if (isReached === true) {
                    status = chalk_1.default.green(figures.tick);
                    budgetText = chalk_1.default.green(category.score.toString());
                }
                if (isReached === false) {
                    budgetText = chalk_1.default.red(category.score.toString());
                    status = chalk_1.default.red(figures.cross);
                    allBudgetsReached = false;
                }
                results.push({
                    Category: category.name,
                    Status: status,
                    Score: budgetText,
                    Budget: budget[category.id] ? budget[category.id] : '',
                });
            }
            console.log(chalk_1.default.blue(url));
            console.table(results);
            if (allBudgetsReached) {
                console.log(chalk_1.default.black.bgGreen('Congrats! Budged reached!'));
            }
        });
    }
}
exports.default = CLIReporter;
//# sourceMappingURL=CLIReporter.js.map