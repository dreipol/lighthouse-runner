import Budget from "./Budget";
import ReportersConfig from "./ReportersConfig";
export default interface DreihouseConfig {
    url: string;
    paths: Array<string>;
    folder: string;
    report: any;
    chromeFlags: Array<string>;
    saveReport: Boolean;
    disableEmulation: Boolean;
    disableThrottling: Boolean;
    budget: Budget;
    reporters: ReportersConfig;
    tag: string;
}
