"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const chalk_1 = __importDefault(require("chalk"));
const lighthouseRunner_1 = __importDefault(require("./lighthouseRunner"));
const budget_1 = require("./budget");
function printResults(meta, categories, budget) {
    const { printer } = meta;
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
}
function runPersisters(meta, config, site, results, persisters) {
    const promises = [];
    const modules = persisters.modules;
    if (modules) {
        for (let i = 0; i < modules.length; i++) {
            const persister = modules[i];
            promises.push(persister(meta, config, site, results));
        }
    }
    return Promise.all(promises)
        .then((files) => {
        return files.filter((item) => {
            if (item) {
                return item;
            }
        });
    });
}
function runReport(meta, config, path, opts, port) {
    const { url, budget, report, persisters } = config;
    const { printer } = meta;
    const site = url_1.resolve(url, path);
    printer.print(chalk_1.default.blue(`Run ${site}`));
    return lighthouseRunner_1.default(url, path, opts, report, port)
        .then((results) => {
        const categories = results.reportCategories;
        printResults(meta, categories, budget);
        return runPersisters(meta, config, site, results, persisters)
            .then((files) => {
            results.files = files;
            return results;
        });
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
