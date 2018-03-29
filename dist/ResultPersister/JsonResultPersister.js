"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const helpers_1 = require("./helpers");
class JsonResultPersister {
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
        const { printer, reportFolder } = meta;
        const { saveReport } = config;
        if (reportFolder && saveReport) {
            helpers_1.writeFile(url, reportFolder, JSON.stringify(results), 'json');
            printer.print(`Report created and saved`);
            printer.print(`Save report to: ${reportFolder}`);
            printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
        }
        return Promise.resolve(results);
    }
}
exports.default = JsonResultPersister;
