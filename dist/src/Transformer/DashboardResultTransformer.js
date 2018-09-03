"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { version } = require('../../package.json');
class DashboardResultTransformer {
    static transform(url, categories, budget, tag) {
        const cleanCategories = categories.map((item) => {
            item = Object.assign({}, item);
            delete item.auditRefs;
            return item;
        });
        return {
            categories: cleanCategories,
            budget,
            url,
            tag,
            key: `${tag}:${url}`,
            version
        };
    }
}
exports.default = DashboardResultTransformer;
//# sourceMappingURL=DashboardResultTransformer.js.map