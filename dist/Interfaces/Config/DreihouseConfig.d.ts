import Budget from './Budget';
import PreAuditScriptInterface from '../PreAuditScriptInterface';
export default interface DreihouseConfig {
    url: string;
    paths: string[];
    folder: string;
    report: any;
    chromeFlags: string[];
    saveReport: boolean;
    disableEmulation: boolean;
    disableThrottling: boolean;
    budget: Budget;
    preAuditScripts?: PreAuditScriptInterface[];
    tag: string;
}
