#!/usr/bin/env node

const lib = require('../src/index');
const args = require('./args')({
    reports : "./reports"
});

lib(args.config, args.reports, args.port);
