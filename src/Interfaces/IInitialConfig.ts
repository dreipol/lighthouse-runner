import {IPreAuditScript} from "./IPreAuditScript";
import {IBudget} from "./IBudget";

export interface IInitialConfig {
    paths: string[];
    folder: string;
    chromeFlags: string[];
    initialPageload: boolean;
    disableEmulation: boolean;
    disableThrottling: boolean;
    budget: IBudget;
    preAuditScripts?: IPreAuditScript[];
    tag: string;
    audits?: string[];
    gatherers?: string[];
}
