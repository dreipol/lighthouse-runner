import { ILighthouseConfig } from './ILighthouseConfig';
import { IPreAuditScript } from "./IPreAuditScript";
import { IBudget } from "./BudgetInterface";
export interface IDreihouseConfig {
    paths: string[];
    folder: string;
    lighthouse: ILighthouseConfig;
    chromeFlags: string[];
    initialPageload: boolean;
    disableEmulation: boolean;
    disableThrottling: boolean;
    budget: IBudget;
    preAuditScripts?: IPreAuditScript[];
    tag: string;
}
