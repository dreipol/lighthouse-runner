import Budget from './Budget';
import ReportersConfig from './ReportersConfig';
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
    reporters: ReportersConfig;
    tag: string;
}
