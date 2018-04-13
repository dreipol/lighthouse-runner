"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const helpers_1 = require("./helpers");
function setup(meta, config) {
    const { saveReport, folder } = config;
    const { reportFolder } = meta;
    if (!saveReport || !folder || !reportFolder) {
        return Promise.resolve();
    }
    if (!fs_1.existsSync(reportFolder)) {
        return helpers_1.createFolder(reportFolder);
    }
    return Promise.resolve();
}
function generateReportJson(url, categories, budget, tag) {
    const _categories = categories.map((item) => {
        item = Object.assign({}, item);
        delete item.audits;
        return item;
    });
    const content = {
        categories: _categories,
        budget,
        url,
        tag
    };
    return JSON.stringify(content);
}
function save(meta, config, url, results) {
    return setup(meta, config)
        .then(() => {
        const { reportFolder, printer } = meta;
        const { saveReport } = config;
        if (reportFolder && saveReport) {
            const json = generateReportJson(url, results.reportCategories.slice(0), config.budget, config.persisters.prefix);
            const filename = helpers_1.writeFile(url, reportFolder, json, 'json', config.persisters.prefix, 'dashboard');
            printer.print('JSON Dashboard File created');
            return filename;
        }
        return;
    });
}
exports.default = save;
