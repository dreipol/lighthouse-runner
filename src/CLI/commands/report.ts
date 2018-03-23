import * as yargs from 'yargs';

import { execute } from '../../Runner/index';
import { info } from 'fancy-log';

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
        }
    },
    handler(argv) {
        execute(<string>argv.config, <Number>argv.port, info);
    }
});