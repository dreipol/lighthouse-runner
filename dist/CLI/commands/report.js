"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
    handler: function (argv) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = argv;
            const printer = argv.silent ? new NoopLogger_1.default() : new ConsoleLogger_1.default();
            let persister = new NoopResultPersister_1.default();
            if (type === 'json') {
                persister = new JsonResultPersister_1.default();
            }
            return yield index_1.execute(argv.config, argv.port, printer, persister)
                .catch(console.error);
        });
    }
});
