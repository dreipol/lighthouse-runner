"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractReporter {
    constructor(reportFolder, config, logger) {
        this.key = 'AbstractResultReporter';
        this.reportFolder = reportFolder;
        this.config = config;
        this.logger = logger;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.default = AbstractReporter;
//# sourceMappingURL=AbstractReporter.js.map