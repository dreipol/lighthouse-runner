#!/usr/bin/env node
import {Command} from "commander";

const program = require('commander');

const {version} = require('../../package.json');
import {report, setup} from './lib.js';

program
    .version(version);

program
    .command('setup')
    .option('--config <folder>', 'Use config file')
    .action(async function (command: Command){
         const {config} = command;
         await setup(config);
    });


program
    .command('report')
    .option('--config <file>', 'Use config file')
    .option('--silent', 'Output type')
    .option('--port <port>', 'Output type')
    .action(async function (command: Command) {
        const {config, silent, port} = command;
        await report(config, silent, port);
    });


program.parse(process.argv);
