#!/usr/bin/env node

const { execute } = require('../src/index');
const writeDefaultConfig = require('./writeDefaultConfig.js');
const args = require('./args')({
    args: ['config', 'port'],
    flags: ['setup']
});

if (args.setup) {
    return writeDefaultConfig(args.config)
}

execute(args.config, args.port);

