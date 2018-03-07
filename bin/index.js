#!/usr/bin/env node

const {execute} = require('../src/index');
const args = require('./args')();

execute(args.config, args.port);
