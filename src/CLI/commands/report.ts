import * as yargs from 'yargs';

import { execute } from '../../Runner/index';
import ConsolePrinter from '../../Runner/Printer/ConsolePrinter';
import NoopPrinter from '../../Runner/Printer/NoopPrinter';

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
        }
    },
    handler(argv) {
        const printer = argv.silent ? new NoopPrinter() : new ConsolePrinter();
        execute(<string>argv.config, <Number>argv.port, printer);
    }
});