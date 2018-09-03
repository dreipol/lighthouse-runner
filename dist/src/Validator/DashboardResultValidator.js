"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = __importStar(require("joi"));
const DashboardJsonSchema_1 = __importDefault(require("./schema/DashboardJsonSchema"));
class DashboardResultValidator {
    static validate(config) {
        const result = joi.validate(config, DashboardJsonSchema_1.default);
        if (result.error) {
            throw new Error(result.error.message);
        }
        return result.value;
    }
}
exports.default = DashboardResultValidator;
//# sourceMappingURL=DashboardResultValidator.js.map