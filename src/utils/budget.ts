/**
 * Check scores against configured budget and make colored output
 */
import ReportCategory from "../Interfaces/ReportCategory";
import Budget from "../Interfaces/Config/Budget";

export function checkBudget(caregory: ReportCategory, budget: Budget): Boolean | null {
    const { id, score } = caregory;
    const threshhold = budget[id];

    if (threshhold === undefined || threshhold === null) {
        return null;
    }

    if (score >= threshhold) {
        return true;
    } else {
        return false;
    }
}

/**
 * Print colored budget
 */
export function getScoreString(category: ReportCategory, budget: Budget): string {
    const { id, name, score } = category;
    const threshhold = budget[id];

    if (threshhold === undefined || threshhold === null || threshhold === false) {
        return `${name}: ${score}`;
    }

    return `${name}: ${score}/${threshhold}`;
}
