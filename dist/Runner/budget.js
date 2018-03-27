"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkBudget(caregory, budget) {
    const { id, score } = caregory;
    const threshhold = budget[id];
    if (threshhold === undefined || threshhold === null) {
        return null;
    }
    if (score >= threshhold) {
        return true;
    }
    else {
        return false;
    }
}
exports.checkBudget = checkBudget;
function getScoreString(category, budget) {
    const { id, name, score } = category;
    const threshhold = budget[id];
    if (threshhold === undefined || threshhold === null || threshhold === false) {
        return `${name}: ${score}`;
    }
    return `${name}: ${score}/${threshhold}`;
}
exports.getScoreString = getScoreString;
