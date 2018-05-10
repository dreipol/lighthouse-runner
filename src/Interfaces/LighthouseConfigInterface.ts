import BudgetInterface from "./BudgetInterface";
import ReportersConfigInterface from "./ReportersConfigInterface";

export default interface LighthouseConfigInterface {
    url: string;
    paths: Array<string>;
    folder: string;
    report: any;
    chromeFlags: Array<string>;
    saveReport: Boolean;
    disableEmulation: Boolean;
    disableThrottling: Boolean;
    budget: BudgetInterface;
    reporters: ReportersConfigInterface;
    tag: string;
}
