"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
exports.default = Joi.object().keys({
    paths: Joi.array().items(Joi.string()).required(),
    folder: Joi.string().allow(null).required(),
    tag: Joi.string().default('report').required(),
    chromeFlags: Joi.array().items(Joi.string()).required(),
    disableEmulation: Joi.boolean().required(),
    disableThrottling: Joi.boolean().required(),
    budget: Joi.object().required(),
    initialPageload: Joi.boolean().required(),
    audits: Joi.array(),
    gatherers: Joi.array(),
    preAuditScripts: Joi.array(),
});
//# sourceMappingURL=ConfigSchema.js.map