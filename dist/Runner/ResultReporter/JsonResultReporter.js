"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const helpers_1 = require("./helpers");
const url_1 = require("url");
class JsonResultReporter {
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
        if (meta.reportFolder) {
            this.writeFile(url, meta.reportFolder, results);
            meta.printer.print(`Report created and saved`);
        }
        return Promise.resolve(results);
    }
}
exports.default = JsonResultReporter;
