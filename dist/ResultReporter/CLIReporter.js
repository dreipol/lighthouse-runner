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
const AbstractResultReporter_1 = __importDefault(require("./AbstractResultReporter"));
const chalk_1 = __importDefault(require("chalk"));
class CLIReporter extends AbstractResultReporter_1.default {
    constructor() {
        super(...arguments);
        this.key = 'CLIReporter';
    }
    handle(url, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = results.reportCategories;
            const { budget } = this.config;
            this.logger.print(`Report: ${url}`);
            this.logger.print(''.padStart(10, '-'));
            yield this.printResults(categories, budget);
        });
    }
    checkBudget(caregory, budget) {
        const { id, score } = caregory;
        const threshhold = budget[id];
        if (threshhold === undefined || threshhold === null) {
            return null;
        }
        if (score >= threshhold) {
            return true;
        }
        else {
            return false;
        }
    }
    getScoreString(category, budget) {
        const { id, name, score } = category;
        const threshhold = budget[id];
        if (threshhold === undefined || threshhold === null || threshhold === false) {
            return `${name}: ${score}`;
        }
        return `${name}: ${score}/${threshhold}`;
    }
    printResults(categories, budget) {
        return __awaiter(this, void 0, void 0, function* () {
            let allBudgetsReached = true;
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                category.score = Math.round(category.score);
                const isReached = this.checkBudget(category, budget);
                let budgetText = this.getScoreString(category, budget);
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
}
exports.default = CLIReporter;
//# sourceMappingURL=CLIReporter.js.map