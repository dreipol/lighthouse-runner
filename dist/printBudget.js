"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const fancy_log_1 = __importDefault(require("fancy-log"));
const chalk_1 = __importDefault(require("chalk"));
function printBudget(categoryId, name, score, budget) {
    const threshhold = budget[categoryId];
    if (threshhold === false || threshhold === undefined || threshhold === null) {
        fancy_log_1.default(name, score);
        return;
    }
    if (score >= threshhold) {
        fancy_log_1.default(chalk_1.default.green(`${name}: ${score}/${threshhold}`));
    }
    else {
        fancy_log_1.default(chalk_1.default.red(`${name}: ${score}/${threshhold}`));
    }
}
exports.default = printBudget;
