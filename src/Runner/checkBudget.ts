import { BudgetInterface } from './Interfaces';

/**
 * Check scores against configured budget and make colored output
 */
export default function checkBudget(categoryId: string, score: Number, budget: BudgetInterface): Boolean | null {
    const threshhold = budget[categoryId];

    if (threshhold === undefined || threshhold === null) {
        return null;
    }

    if (score >= threshhold) {
        return true;
    } else {
        return false;
    }
}