"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkBudget(categoryId, score, budget) {
    const threshhold = budget[categoryId];
    if (threshhold === false || threshhold === undefined || threshhold === null) {
        return null;
    }
    if (score >= threshhold) {
        return true;
    }
    else {
        return false;
    }
}
exports.default = checkBudget;
