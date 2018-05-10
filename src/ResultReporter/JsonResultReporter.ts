import {existsSync} from 'fs';

import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import AbstractResultReporter from "./AbstractResultReporter";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LoggerInterface from "../Interfaces/LoggerInterface";
import writeFile from "../utils/writeFile";
import createFolder from "../utils/createFolder";

export default class JsonResultReporter extends AbstractResultReporter {

    constructor(reportFolder: string, config: LighthouseConfigInterface, logger: LoggerInterface) {
        super(reportFolder, config, logger);
    }

    async setup(): Promise<void> {
        const {saveReport, folder} = this.config;

        if (!saveReport || !folder || !this.reportFolder) {
            return;
        }

        if (!existsSync(this.reportFolder)) {
            return createFolder(this.reportFolder)
        }
        return;
    }

    async handle(url: string, results: LighthouseReportResultInterface): Promise<void> {
        const {saveReport} = this.config;

        if (this.reportFolder && saveReport) {
            writeFile(url, this.reportFolder, JSON.stringify(results), 'json', this.config.tag);
            this.logger.print('JSON File created');
            this.logger.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
        }

        return;
    }
}