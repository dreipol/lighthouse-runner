#!/usr/bin/env node

import { execute } from '../Runner/index';
import writeDefaultConfig from './writeDefaultConfig.js';
import argParser from './args';
import { info } from 'fancy-log';


const args = argParser({
    args: ['config', 'port'],
    flags: ['setup']
});

if (args.setup) {
    writeDefaultConfig(<string>args.config);
} else {
    execute(<string>args.config, <Number>args.port, info);
}