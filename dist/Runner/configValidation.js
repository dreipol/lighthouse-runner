"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const joi = __importStar(require("joi"));
const ConfigSchema_1 = __importDefault(require("./ConfigSchema"));
function validate(config) {
    const result = joi.validate(config, ConfigSchema_1.default);
    if (result.error) {
        return Promise.reject(result.error);
    }
    return Promise.resolve(result.value);
}
exports.default = validate;
