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
const fs_1 = require("fs");
const AbstractResultReporter_1 = __importDefault(require("./AbstractResultReporter"));
const writeFile_1 = __importDefault(require("../utils/writeFile"));
const createFolder_1 = __importDefault(require("../utils/createFolder"));
class JsonResultReporter extends AbstractResultReporter_1.default {
    constructor() {
        super(...arguments);
        this.key = 'JsonResultReporter';
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const { folder } = this.config;
            if (!folder || !this.reportFolder) {
                return;
            }
            if (!fs_1.existsSync(this.reportFolder)) {
                return createFolder_1.default(this.reportFolder);
            }
            return;
        });
    }
    handle(url, results) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reportFolder) {
                writeFile_1.default(url, this.reportFolder, JSON.stringify(results), 'json', this.config.tag);
                this.logger.print('JSON File created');
                this.logger.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
            }
            return;
        });
    }
}
exports.default = JsonResultReporter;
//# sourceMappingURL=JsonResultReporter.js.map