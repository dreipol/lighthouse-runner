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
function generateReportHtml(categories) {
    const shrinkedCategories = categories.map((item) => {
        return { name: item.name, score: item.score };
    });
    const categoryNames = categories.map((item) => {
        return item.name;
    });
    let content = helpers_1.readFile(path_1.resolve(__dirname, '../../Templates/dashboard.html'));
    const options = {
        data: {
            json: shrinkedCategories,
            keys: {
                value: ["score"]
            },
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
            pattern: ["#607D8B"],
            threshold: {
                value: [30, 90]
            }
        },
        bindto: '#chart'
    };
    return content.replace('INJECT_CONFIG', JSON.stringify(options));
}
function save(meta, config, url, results) {
    return setup(meta, config)
        .then(() => {
        const { reportFolder, printer } = meta;
        const { saveReport } = config;
        if (reportFolder && saveReport) {
            const html = generateReportHtml(results.reportCategories);
            helpers_1.writeFile(url, reportFolder, html, 'html', 'dashboard_');
            printer.print('HTML Dashboard File created');
        }
        return results;
    });
}
exports.default = save;
