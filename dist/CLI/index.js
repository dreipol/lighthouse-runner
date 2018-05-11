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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require('commander');
const { version } = require('../../package.json');
const NoopLogger_1 = __importDefault(require("../Logger/NoopLogger"));
const Dreihouse_1 = __importDefault(require("../Dreihouse"));
const ConsoleLogger_1 = __importDefault(require("../Logger/ConsoleLogger"));
const writeDefaultConfig_1 = __importDefault(require("./writeDefaultConfig"));
program
    .version(version);
program
    .command('setup <folder>')
    .description('Setup default configuration')
    .action((folder) => __awaiter(this, void 0, void 0, function* () {
    yield writeDefaultConfig_1.default(folder);
}));
program
    .command('report <file>')
    .description('Run report with configuration')
    .option('-v, --verbose', 'Output type')
    .option('-r, --reporter <items>', 'Add list of reporters to use for handling the result')
    .option('-p, --port <port>', 'Use given port for debugging')
    .action((file, command) => __awaiter(this, void 0, void 0, function* () {
    const { verbose, port, reporter } = command;
    const printer = !verbose ? new ConsoleLogger_1.default() : new NoopLogger_1.default();
    const dreihouse = new Dreihouse_1.default(file, reporter, printer);
    return yield dreihouse.execute(port);
}));
program.parse(process.argv);
