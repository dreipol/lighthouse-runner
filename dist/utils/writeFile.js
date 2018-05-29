"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const fs_1 = require("fs");
const path_1 = require("path");
const formatDate_1 = __importDefault(require("./formatDate"));
const urlToPath_1 = __importDefault(require("./urlToPath"));
function writeFile(url, folder, content, type, prefix = '', suffix = '') {
    const reportUrl = url_1.parse(url);
    const pathname = urlToPath_1.default(url);
    const filenamePrefix = formatDate_1.default(new Date());
    console.log(filenamePrefix);
    if (suffix) {
        suffix = `.${suffix}`;
    }
    if (prefix) {
        prefix = `${prefix}.`;
    }
    const filename = path_1.join(folder, `${prefix}${filenamePrefix}__${reportUrl.hostname}__${pathname}${suffix}.${type}`);
    fs_1.writeFileSync(filename, content);
    return filename;
}
exports.default = writeFile;
//# sourceMappingURL=writeFile.js.map