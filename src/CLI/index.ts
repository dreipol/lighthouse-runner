#!/usr/bin/env node

import setup from './commands/setup';
import report from './commands/report';

require('yargs')
    .command(setup)
    .command(report)
    .argv