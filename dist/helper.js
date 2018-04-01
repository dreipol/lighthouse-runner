"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
const MAPPED_PERSISTERS = {
    'html': './ResultPersister/HTMLResultPersister',
    'json': './ResultPersister/JSONResultPersister',
    'graphite': './ResultPersister/GraphiteResultPersister',
};
function coloredFlag(name, flag) {
    if (flag === true) {
        return chalk_1.default.green(name);
    }
    return chalk_1.default.red(name);
}
exports.coloredFlag = coloredFlag;
function composeMetaObject(configFile, config, printer) {
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
    };
}
exports.composeMetaObject = composeMetaObject;
function remapPersisterNames(config) {
    const { modules } = config.persisters;
    if (!modules) {
        return config;
    }
    let mappedModules = [];
    for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        if (typeof module === 'string') {
            const funcFile = MAPPED_PERSISTERS[module];
            if (funcFile) {
                mappedModules.push(require(funcFile).default);
            }
        }
        if (typeof module === 'function') {
            mappedModules.push(module);
        }
    }
    config.persisters.modules = mappedModules;
    return config;
}
exports.remapPersisterNames = remapPersisterNames;
