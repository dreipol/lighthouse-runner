"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ReportGenerator = require('lighthouse/lighthouse-core/report/v2/report-generator');
const helpers_1 = require("./helpers");
class HTMLResultPersister {
    setup(meta, config) {
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
    save(meta, config, url, results) {
        const { reportFolder } = meta;
        const { saveReport } = config;
        if (reportFolder && saveReport) {
            const generator = new ReportGenerator();
            const html = generator.generateReportHtml(results);
            helpers_1.writeFile(url, reportFolder, html, 'html');
        }
        return Promise.resolve(results);
    }
}
exports.default = HTMLResultPersister;
