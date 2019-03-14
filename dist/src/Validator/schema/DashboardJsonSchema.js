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
    categories: Joi.array().items(Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        manualDescription: Joi.string(),
        id: Joi.string().required(),
        score: Joi.number().min(0).max(100).required(),
    })),
    budget: Joi.object(),
    url: Joi.string().required(),
    tag: Joi.string().required(),
    key: Joi.string().required(),
    version: Joi.string().required(),
});
//# sourceMappingURL=DashboardJsonSchema.js.map