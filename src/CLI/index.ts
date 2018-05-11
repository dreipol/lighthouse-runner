#!/usr/bin/env node
import {Command} from 'commander';

const program = require('commander');

const {version} = require('../../package.json');
import NoopLogger from '../Logger/NoopLogger';
import Dreihouse from '../Dreihouse';
import ConsoleLogger from '../Logger/ConsoleLogger';
import writeDefaultConfig from './writeDefaultConfig';

program
    .version(version);

program
    .command('setup <folder>')
    .description('Setup default configuration')
    .action(async (folder: string) => {
        await writeDefaultConfig(folder);
    });

program
    .command('report <file>')
    .description('Run report with configuration')
    .option('-v, --verbose', 'Output type')
    .option('-r, --reporter <items>', 'Add list of reporters to use for handling the result')
    .option('-p, --port <port>', 'Use given port for debugging')
    .action(async (file: string, command: Command) => {
        const {verbose, port, reporter} = command;
        const printer = !verbose ? new ConsoleLogger() : new NoopLogger();
        const dreihouse = new Dreihouse(file, reporter, printer);
        return await dreihouse.execute(port);
    });

program.parse(process.argv);
