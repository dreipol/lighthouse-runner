"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../Runner/index");
const fancy_log_1 = require("fancy-log");
exports.default = ({
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
        index_1.execute(argv.config, argv.port, fancy_log_1.info);
    }
});
