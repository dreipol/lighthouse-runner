"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const chalk_1 = __importDefault(require("chalk"));
const lighthouseRunner_1 = __importDefault(require("./lighthouseRunner"));
const budget_1 = require("./budget");
function runReport(printer, host, paths, opts, config, saveReport, budget, folder, port) {
    const url = url_1.resolve(host, paths);
    printer.print(chalk_1.default.blue(`Run ${url}`));
    return lighthouseRunner_1.default(host, paths, opts, config, port)
        .then((results) => {
        if (saveReport && folder) {
            printer.print(`Report created and saved`);
        }
        const categories = results.reportCategories;
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
            printer.print(budgetText);
        }
        if (allBudgetsReached) {
            printer.print(chalk_1.default.bgGreen('Congrats! Budged reached!'));
        }
        return categories;
    });
}
function runReports(printer, url, paths, opts, config, saveReport, budget, folder, port, allResults = []) {
    const urlPath = paths.shift();
    printer.print(''.padStart(10, '-'));
    if (!urlPath) {
        return Promise.resolve();
    }
    return runReport(printer, url, urlPath, opts, config, saveReport, budget, folder, port)
        .then((results) => {
        allResults.push(results);
        if (paths.length > 0) {
            return runReports(printer, url, paths, opts, config, saveReport, budget, folder, port, allResults);
        }
        return allResults;
    })
        .catch((e) => console.error(e));
}
exports.runReports = runReports;
