"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
function coloredFlag(name, flag) {
    if (flag === true) {
        return chalk_1.default.green(name);
    }
    return chalk_1.default.red(name);
}
exports.coloredFlag = coloredFlag;
function composeMetaObject(configFile, config, printer, reporter) {
    let reportFolder = null;
    const configPath = path_1.dirname(configFile);
    if (config.folder) {
        reportFolder = path_1.resolve(configPath, config.folder);
    }
    return {
        configFile,
        configFolder: configPath,
        reportFolder,
        printer,
        reporter,
    };
}
exports.composeMetaObject = composeMetaObject;
