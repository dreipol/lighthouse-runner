#!/usr/bin/env node
import {Command} from "commander";

const program = require('commander');

const {version} = require('../../package.json');
import {report, setup} from './lib';

program
    .version(version);

program
    .command('setup <folder>')
    .description('Setup default configuration')
    .action(async function (folder: string) {
        await setup(folder);
    });

program
    .command('report <file>')
    .description('Run report with configuration')
    .option('-s, --silent', 'Output type')
    .option('-p, --port <port>', 'Use given port for debugging')
    .action(async function (file: string, command: Command) {
        const {silent, port} = command;
        await report(file, silent, port);
    });

program.parse(process.argv);
