import Budget from './Budget';
import ReportersConfig from './ReportersConfig';

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
    reporters: ReportersConfig;
    tag: string;
}
