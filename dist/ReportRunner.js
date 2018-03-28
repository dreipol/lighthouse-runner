"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const chalk_1 = __importDefault(require("chalk"));
const lighthouseRunner_1 = __importDefault(require("./lighthouseRunner"));
const budget_1 = require("./budget");
function runReport(meta, config, path, opts, port) {
    const { url, budget, report } = config;
    const { printer, reporter } = meta;
    const site = url_1.resolve(url, path);
    printer.print(chalk_1.default.blue(`Run ${site}`));
    return lighthouseRunner_1.default(url, path, opts, report, port)
        .then((results) => {
        return reporter.setup(meta, config)
            .then(() => {
            return reporter.save(meta, config, site, results);
        });
    })
        .then((results) => {
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
function runReports(meta, config, opts, port, paths, allResults = []) {
    const urlPath = paths.shift();
    const { printer } = meta;
    printer.print(''.padStart(10, '-'));
    if (!urlPath) {
        return Promise.resolve();
    }
    return runReport(meta, config, urlPath, opts, port)
        .then((results) => {
        allResults.push(results);
        if (paths.length > 0) {
            return runReports(meta, config, opts, port, paths, allResults);
        }
        return allResults;
    })
        .catch((e) => console.error(e));
}
exports.runReports = runReports;
