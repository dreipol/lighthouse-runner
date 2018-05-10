"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
function coloredFlag(name, flag) {
    if (flag === true) {
        return chalk_1.default.green(name);
    }
    return chalk_1.default.red(name);
}
exports.coloredFlag = coloredFlag;
