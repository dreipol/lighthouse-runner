#!/usr/bin/env node
import {Command} from 'commander';
import NoopLogger from '../Logger/NoopLogger';
import Dreihouse from '../Dreihouse';
import ConsoleLogger from '../Logger/ConsoleLogger';
import writeDefaultConfig from './writeDefaultConfig';

const program = require('commander');

const {version} = require('../../package.json');

program
    .version(version);

program
    .command('setup <folder>')
    .description('Setup default configuration')
    .action(async (folder: string) => {
        await writeDefaultConfig(folder);
    });

program
    .command('report <root-url>')
    .description('Run report with configuration')
    .option('-v, --verbose', 'Verbose output')
    .option('-s, --silent', 'Suppress output')
    .option('-f, --config-file <file>', 'Define the root url of the page', null)
    .option('-r, --reporter <items>', 'Add list of reporters to use for handling the result', (val: string) => val.split(','), ['cli'])
    .option('-p, --port <port>', 'Use given port for debugging')
    .action(async (rootUrl: string, command: Command) => {
        const {verbose, port, reporter, configFile, silent} = command;
        const printer = verbose ? new ConsoleLogger() : new NoopLogger();
        try {
            printer.print(`Dreihouse v${version}`);
            const dreihouse = new Dreihouse(configFile, reporter, printer, verbose || silent);
            await dreihouse.execute(rootUrl, port);
            printer.print('Dreihouse completed');
        } catch (e) {
            console.error(e.message);
            process.exit(e.co);
        }
        return;
    });

program.parse(process.argv);
