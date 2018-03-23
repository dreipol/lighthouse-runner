#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../Runner/index");
const writeDefaultConfig_js_1 = __importDefault(require("./writeDefaultConfig.js"));
const fancy_log_1 = require("fancy-log");
require('yargs')
    .command('setup', 'Create initial setup', () => {
}, (argv) => {
    writeDefaultConfig_js_1.default(argv.config);
})
    .command('report', 'Run report', () => {
}, (argv) => {
    index_1.execute(argv.config, argv.port, fancy_log_1.info);
})
    .option('config', {
    alias: 'c',
    describe: 'Config file to use for report',
    default: null
})
    .option('port', {
    alias: 'p',
    describe: 'Port to use for debug',
    default: null
})
    .demandOption(['config'])
    .help()
    .argv;
