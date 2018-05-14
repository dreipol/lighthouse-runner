import Budget from './Budget';
import PreAuditScript from '../../PreAuditScript/PreAuditScript';

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
    preAuditScripts?: PreAuditScript[];
    tag: string;
}
