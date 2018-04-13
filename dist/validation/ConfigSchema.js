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
    url: Joi.string().required(),
    paths: Joi.array().items(Joi.string()).required(),
    folder: Joi.string().allow(null)
        .when('saveReport', {
        is: true,
        then: Joi.string().required(),
    }),
    tag: Joi.string().required(),
    chromeFlags: Joi.array().items(Joi.string()).required(),
    disableEmulation: Joi.boolean().required(),
    disableThrottling: Joi.boolean().required(),
    saveReport: Joi.boolean().required(),
    budget: Joi.object().required(),
    persisters: Joi.object().keys({
        modules: Joi.array(),
    }),
    report: Joi.object().keys({
        settings: Joi.object(),
        passes: Joi.array(),
        audits: Joi.array(),
        groups: Joi.object(),
        categories: Joi.object(),
    }).required(),
});
