"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class RunnerResultTransformer {
    static transform(result) {
        return {
            categoryGroups: lodash_1.values(result.lhr.categories),
            lhr: result.lhr,
            reporters: []
        };
    }
}
exports.default = RunnerResultTransformer;
//# sourceMappingURL=RunnerResultTransformer.js.map