"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const writeDefaultConfig_js_1 = __importDefault(require("../writeDefaultConfig.js"));
exports.default = ({
    command: 'setup',
    describe: 'Create inital configsetup',
    builder: {
        config: {
            required: true,
            description: 'Folder to store config'
        }
    },
    handler(argv) {
        writeDefaultConfig_js_1.default(argv.config);
    }
});
