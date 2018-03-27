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
        return __awaiter(this, void 0, void 0, function* () {
            return yield writeDefaultConfig_js_1.default(argv.config);
        });
    }
});
