#!/usr/bin/env node

import { execute } from '../Runner/index';
import writeDefaultConfig from './writeDefaultConfig.js';
import { info } from 'fancy-log';

require('yargs') // eslint-disable-line
    .command('setup', 'Create initial setup', () => {
    }, (argv: any) => {
        writeDefaultConfig(<string>argv.config);
    })
    .command('report', 'Run report', () => {

    }, (argv: any) => {
        execute(<string>argv.config, <Number>argv.port, info);
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
    .argv