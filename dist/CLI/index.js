#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require('commander');
const { version } = require('../../package.json');
const lib_js_1 = require("./lib.js");
program
    .version(version);
program
    .command('report')
    .option('--config <file>', 'Use config file')
    .option('--type <type>', 'Output type')
    .option('--silent', 'Output type')
    .option('--port <port>', 'Output type')
    .action(function (command) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config, type, silent, port } = command;
        yield lib_js_1.report(config, type, silent, port);
    });
});
program
    .command('setup')
    .option('--config <folder>', 'Use config file')
    .action(function (command) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = command;
        yield lib_js_1.setup(config);
    });
});
program.parse(process.argv);
