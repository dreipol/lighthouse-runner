import BudgetInterface from "./BudgetInterface";
import PersisterConfigInterface from "./PersisterConfigInterface";
export default interface LighthouseConfigInterface {
    url: string;
    paths: Array<string>;
    folder: string;
    report: LighthouseConfigInterface;
    chromeFlags: Array<string>;
    saveReport: Boolean;
    disableEmulation: Boolean;
    disableThrottling: Boolean;
    budget: BudgetInterface;
    persisters: PersisterConfigInterface;
    tag: string;
}
