#!/usr/bin/env node
import NoopResultPersister from "../Runner/ResultPersister/NoopResultPersister";
import {execute} from "../Runner";
import NoopLogger from "../Runner/Logger/NoopLogger";
import JsonResultPersister from "../Runner/ResultPersister/JsonResultPersister";
import ConsoleLogger from "../Runner/Logger/ConsoleLogger";

const program = require('commander');

program
    .command('report')
    .option('--config <file>', 'Use config file')
    .option('--type <type>', 'Output type')
    .option('--silent', 'Output type')
    .option('--port <port>', 'Output type')
    .action(function (command: any) {
        const {config, type, silent, port} = command;

        const printer = silent ? new NoopLogger() : new ConsoleLogger();
        let persister = new NoopResultPersister();

        if (type === 'json') {
            persister = new JsonResultPersister();
        }

        return execute(config, port, printer, persister)
            .catch(console.error);
    });

program.parse(process.argv);
