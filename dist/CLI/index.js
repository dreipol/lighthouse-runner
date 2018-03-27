#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const NoopResultPersister_1 = __importDefault(require("../Runner/ResultPersister/NoopResultPersister"));
const Runner_1 = require("../Runner");
const NoopLogger_1 = __importDefault(require("../Runner/Logger/NoopLogger"));
const JsonResultPersister_1 = __importDefault(require("../Runner/ResultPersister/JsonResultPersister"));
const ConsoleLogger_1 = __importDefault(require("../Runner/Logger/ConsoleLogger"));
const { version } = require('../../package.json');
const program = require('commander');
program
    .version(version);
program
    .command('report')
    .option('--config <file>', 'Use config file')
    .option('--type <type>', 'Output type')
    .option('--silent', 'Output type')
    .option('--port <port>', 'Output type')
    .action(function (command) {
    const { config, type, silent, port } = command;
    const printer = silent ? new NoopLogger_1.default() : new ConsoleLogger_1.default();
    let persister = new NoopResultPersister_1.default();
    if (type === 'json') {
        persister = new JsonResultPersister_1.default();
    }
    printer.print(`Version ${version}`);
    return Runner_1.execute(config, port, printer, persister)
        .catch(console.error);
});
program.parse(process.argv);
