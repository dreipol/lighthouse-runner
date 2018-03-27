import { LaunchedChrome as Chrome, Results } from 'lighthouse/typings/externs';
import PrinterInterface from "./Printer/Interface";
import ResultReporterInterface from "./ResultReporter/Interface";

export interface LaunchedChrome {
    chrome?: Chrome | null,
    port: Number
}

export interface LighthouseOptionsInterface {
    chromeFlags?: Array<string>;
    port?: Number;
    disableDeviceEmulation?: Boolean;
    disableNetworkThrottling?: Boolean;
    disableCpuThrottling?: Boolean;
}

export interface LighthouseConfigInterface {
    url: string;
    paths: Array<string>;
    folder: string;
    report: LighthouseReportConfigInterface;
    chromeFlags: Array<string>;
    saveReport: Boolean;
    disableEmulation: Boolean;
    disableThrottling: Boolean;
    budget: BudgetInterface;
}

export interface BudgetInterface {
    [index: string]: Number | boolean | undefined;

    dreipol?: Number | boolean;
    performance?: Number | boolean;
    pwa?: Number | boolean;
    accessibility?: Number | boolean;
    'best-practices'?: Number | boolean;
}

export interface LighthouseReportConfigInterface {

}

export interface LighthouseReportResultInterface extends Results {
    reportCategories: Array<ReportCategory>
}

export interface ReportCategory {
    score: number;
    id: string;
    name: string;
    description: string;
    audits: Array<Object>
}

export interface RunnerMeta {
    configFolder: string;
    configFile: string;
    reportFolder: string|null;
    printer: PrinterInterface;
    reporter: ResultReporterInterface;
}
