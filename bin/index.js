#!/usr/bin/env node

const lib = require('../src/index');
const args = require('./args')();

lib(args.config, args.port);
