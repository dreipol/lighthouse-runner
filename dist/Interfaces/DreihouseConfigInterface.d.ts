import { ILighthouseConfig } from './ILighthouseConfig';
import { IPreAuditScript } from "./IPreAuditScript";
import { IBudget } from "./BudgetInterface";
export interface DreihouseConfigInterface {
    paths: string[];
    folder: string;
    report: ILighthouseConfig;
    chromeFlags: string[];
    initialPageload: boolean;
    disableEmulation: boolean;
    disableThrottling: boolean;
    budget: IBudget;
    preAuditScripts?: IPreAuditScript[];
    tag: string;
}
