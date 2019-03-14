"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const DEFAULT_LIGHTHOUSE_CONFIG = require('../../config/lighthouse-config.js');
class ConfigTransformer {
    static transform(config) {
        const lighthouse = Object.assign({}, DEFAULT_LIGHTHOUSE_CONFIG);
        lighthouse.audits = lodash_1.merge(lighthouse.audits, config.audits);
        lighthouse.passes.push({
            passName: 'offlinePass',
            gatherers: config.gatherers,
        });
        return {
            paths: config.paths,
            folder: config.folder,
            chromeFlags: config.chromeFlags,
            initialPageload: config.initialPageload,
            disableEmulation: config.disableEmulation,
            disableThrottling: config.disableThrottling,
            budget: config.budget,
            tag: config.tag,
            preAuditScripts: config.preAuditScripts,
            lighthouse
        };
    }
}
exports.default = ConfigTransformer;
//# sourceMappingURL=ConfigTransformer.js.map