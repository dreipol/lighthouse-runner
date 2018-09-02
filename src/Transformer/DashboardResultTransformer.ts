import IReportCategory from "../Interfaces/IReportCategory";
import {IBudget} from "../Interfaces/BudgetInterface";
import IJSONReportResult from "../Interfaces/IJSONReportResult";

const {version} = require('../../package.json');

export default class DashboardResultTransformer {
    public static transform(url: string, categories: IReportCategory[], budget: IBudget, tag: string): IJSONReportResult {
        const cleanCategories = categories.map((item) => {
            item = {...item};
            delete item.auditRefs;
            return item;
        });
        
        return {
            categories: cleanCategories,
            budget,
            url,
            tag,
            key: `${tag}:${url}`,
            version
        };
    }
}
