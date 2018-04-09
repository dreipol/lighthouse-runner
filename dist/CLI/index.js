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
const lib_1 = require("./lib");
program
    .version(version);
program
    .command('setup <folder>')
    .description('Setup default configuration')
    .action(function (folder) {
    return __awaiter(this, void 0, void 0, function* () {
        yield lib_1.setup(folder);
    });
});
program
    .command('report <file>')
    .description('Run report with configuration')
    .option('-s, --silent', 'Output type')
    .option('-p, --port <port>', 'Use given port for debugging')
    .action(function (file, command) {
    return __awaiter(this, void 0, void 0, function* () {
        const { silent, port } = command;
        yield lib_1.report(file, silent, port);
    });
});
program.parse(process.argv);
