"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../Runner/index");
const ConsoleLogger_1 = __importDefault(require("../../Runner/Logger/ConsoleLogger"));
const NoopLogger_1 = __importDefault(require("../../Runner/Logger/NoopLogger"));
const JsonResultPersister_1 = __importDefault(require("../../Runner/ResultPersister/JsonResultPersister"));
const NoopResultPersister_1 = __importDefault(require("../../Runner/ResultPersister/NoopResultPersister"));
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
    handler(argv) {
        const { type } = argv;
        const printer = argv.silent ? new NoopLogger_1.default() : new ConsoleLogger_1.default();
        let persister = new NoopResultPersister_1.default();
        if (type === 'json') {
            persister = new JsonResultPersister_1.default();
        }
        index_1.execute(argv.config, argv.port, printer, persister);
    }
});
