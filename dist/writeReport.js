"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const url_1 = require("url");
const path_1 = require("path");
function formatDate(date) {
    let year = date.getUTCFullYear().toString();
    let month = date.getUTCMonth().toString();
    let day = date.getUTCDay().toString();
    let h = date.getUTCHours().toString();
    let m = date.getUTCMinutes().toString();
    let s = date.getUTCSeconds().toString();
    month = month.padStart(3 - month.length, '0');
    day = day.padStart(3 - day.length, '0');
    h = h.padStart(3 - h.length, '0');
    m = m.padStart(3 - m.length, '0');
    s = s.padStart(3 - s.length, '0');
    return `${year}${month}${day}-${h}${m}${s}`;
}
function writeReportFile(configFolder, _url, results) {
    const d = new Date();
    if (!fs_1.existsSync(configFolder)) {
        fs_1.mkdirSync(configFolder);
    }
    const reportUrl = url_1.parse(_url);
    let pathname = reportUrl.pathname;
    if (!pathname) {
        throw new Error('Can not get pathname from url');
    }
    pathname = pathname.replace(/(^\/)|(\/$)/g, '');
    pathname = pathname.replace(/\//g, '_');
    const filenamePrefix = formatDate(d);
    const filename = path_1.join(configFolder, `${filenamePrefix}__${reportUrl.hostname}__${pathname}.json`);
    fs_1.writeFileSync(filename, JSON.stringify(results));
}
exports.default = writeReportFile;
