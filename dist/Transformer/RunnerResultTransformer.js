"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class RunnerResultTransformer {
    static transform(result) {
        const transformedResult = {
            categoryGroups: lodash_1.values(result.lhr.categories),
            lhr: result.lhr,
        };
        return transformedResult;
    }
}
exports.default = RunnerResultTransformer;
//# sourceMappingURL=RunnerResultTransformer.js.map