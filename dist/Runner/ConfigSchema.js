"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
exports.default = Joi.object().keys({
    url: Joi.string(),
    paths: Joi.array().items(Joi.string()),
    folder: Joi.string(),
    chromeFlags: Joi.array().items(Joi.string()),
    disableEmulation: Joi.boolean(),
    disableThrottling: Joi.boolean(),
    saveReport: Joi.boolean(),
    budget: Joi.object(),
    report: Joi.object().keys({
        settings: Joi.object(),
        passes: Joi.array(),
        audits: Joi.array(),
        groups: Joi.object(),
        categories: Joi.object(),
    }),
});
