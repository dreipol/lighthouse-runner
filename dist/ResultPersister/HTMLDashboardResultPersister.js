"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
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
function generateReportHtml(url, categories, budget) {
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
function save(meta, config, url, results) {
    return setup(meta, config)
        .then(() => {
        const { reportFolder, printer } = meta;
        const { saveReport } = config;
        if (reportFolder && saveReport) {
            const html = generateReportHtml(url, results.reportCategories, config.budget);
            const file = helpers_1.writeFile(url, reportFolder, html, 'html', config.tag, 'dashboard');
            printer.print('HTML Dashboard File created');
            return file;
        }
        return;
    });
}
exports.default = save;
