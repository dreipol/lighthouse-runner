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
    paths: Joi.string(),
    folder: Joi.string(),
    chromeFlags: Joi.string(),
    disableEmulation: Joi.string(),
    disableThrottling: Joi.string(),
    saveReport: Joi.string(),
    budget: Joi.string(),
    report: Joi.string(),
});
