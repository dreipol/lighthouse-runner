import * as yargs from 'yargs';

import {execute} from '../../Runner/index';
import ConsoleLogger from '../../Runner/Logger/ConsoleLogger';
import NoopLogger from '../../Runner/Logger/NoopLogger';
import JsonResultPersister from "../../Runner/ResultPersister/JsonResultPersister";
import NoopResultPersister from "../../Runner/ResultPersister/NoopResultPersister";

export default <yargs.CommandModule>({
    command: 'report',
    describe: 'Create report for given config',
    builder: {
        config: {
            required: true,
            description: 'Config file'
        },
        port: {
            required: false,
            description: 'Chrome debugging port'
        },
        silent: {
            required: false,
            description: 'Hide output'
        },
        type: {
            required: false,
            description: 'Output type output',
            default: 'json',
        }
    },
    handler : async function(argv) {
        const {type} = argv;
        const printer = argv.silent ? new NoopLogger() : new ConsoleLogger();
        let persister = new NoopResultPersister();

        if (type === 'json') {
            persister = new JsonResultPersister();
        }

        return await execute(<string>argv.config, <Number>argv.port, printer, persister)
            .catch(console.error);
    }
});
