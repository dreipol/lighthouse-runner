"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = require("path");
const fs_1 = require("fs");
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
exports.formatDate = formatDate;
function getPathname(url) {
    const reportUrl = url_1.parse(url);
    let pathname = reportUrl.pathname;
    if (!pathname) {
        throw new Error('Can not get pathname from url');
    }
    pathname = pathname.replace(/(^\/)|(\/$)/g, '');
    pathname = pathname.replace(/\//g, '_');
    return pathname;
}
exports.getPathname = getPathname;
function createFolder(path) {
    return new Promise((res, rej) => {
        mkdirp_1.default(path, (err) => {
            if (err) {
                return rej(err);
            }
            return res();
        });
    });
}
exports.createFolder = createFolder;
function writeFile(url, folder, content, type, prefix = '', suffix = '') {
    const reportUrl = url_1.parse(url);
    const pathname = getPathname(url);
    const filenamePrefix = formatDate(new Date());
    if (suffix) {
        suffix = `.${suffix}`;
    }
    const filename = path_1.join(folder, `${prefix}${filenamePrefix}__${reportUrl.hostname}__${pathname}${suffix}.${type}`);
    fs_1.writeFileSync(filename, content);
}
exports.writeFile = writeFile;
function readFile(path) {
    return fs_1.readFileSync(path, 'utf8');
}
exports.readFile = readFile;
