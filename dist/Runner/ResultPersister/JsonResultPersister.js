"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const url_1 = require("url");
const path_1 = require("path");
const helpers_1 = require("./helpers");
class JsonResultPersister {
    setup(meta, config) {
        const { saveReport, folder } = config;
        if (!saveReport || !folder) {
            return Promise.resolve();
        }
        let reportFolder = path_1.resolve(meta.configFolder, folder);
        if (!fs_1.existsSync(reportFolder)) {
            return helpers_1.createFolder(reportFolder);
        }
        return Promise.resolve();
    }
    writeFile(url, folder, results) {
        const reportUrl = url_1.parse(url);
        const pathname = helpers_1.getPathname(url);
        const filenamePrefix = helpers_1.formatDate(new Date());
        const filename = path_1.join(folder, `${filenamePrefix}__${reportUrl.hostname}__${pathname}.json`);
        fs_1.writeFileSync(filename, JSON.stringify(results));
    }
    save(meta, url, results) {
        const { printer, reportFolder } = meta;
        if (reportFolder) {
            this.writeFile(url, reportFolder, results);
            printer.print(`Report created and saved`);
            printer.print(`Save report to: ${reportFolder}`);
            printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
        }
        return Promise.resolve(results);
    }
}
exports.default = JsonResultPersister;
