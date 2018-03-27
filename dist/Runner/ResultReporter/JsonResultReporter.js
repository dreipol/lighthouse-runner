"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const helpers_1 = require("./helpers");
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
    save(results) {
        console.log(results);
        return Promise.resolve();
    }
}
exports.default = JsonResultReporter;
