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
    [index: string]: Number | Boolean | undefined;

    dreipol?: Number | Boolean;
    performance?: Number | Boolean;
    pwa?: Number | Boolean;
    accessibility?: Number | Boolean;
    'best-practices'?: Number | Boolean;
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