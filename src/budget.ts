import { BudgetInterface, ReportCategory } from './Interfaces';

/**
 * Check scores against configured budget and make colored output
 */
export function checkBudget(caregory: ReportCategory, budget: BudgetInterface): Boolean | null {
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
export function getScoreString(category: ReportCategory, budget: BudgetInterface): string {
    const { id, name, score } = category;
    const threshhold = budget[id];

    if (threshhold === undefined || threshhold === null || threshhold === false) {
        return `${name}: ${score}`;
    }

    return `${name}: ${score}/${threshhold}`;
}
