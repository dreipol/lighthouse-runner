"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../Runner/index");
const ConsolePrinter_1 = __importDefault(require("../../Runner/Printer/ConsolePrinter"));
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
        index_1.execute(argv.config, argv.port, new ConsolePrinter_1.default());
    }
});
