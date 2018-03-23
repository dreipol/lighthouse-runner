import { LaunchedChrome as Chrome, Results } from 'lighthouse/typings/externs';

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
    [index: string]: Number | undefined;

    dreipol?: Number;
    performance?: Number;
    pwa?: Number;
    accessibility?: Number;
    'best-practices'?: Number;
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