import {existsSync} from 'fs';

import ResultReporterInterface from './ResultPersisterInterface';
import {createFolder} from './helpers';
import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta, ReportCategory} from '../Interfaces';
import {parse} from "url";

var graphite = require('graphite');


function prepareData(url: string, data: Array<ReportCategory>): Object {
    let result: any = {};
    for (let i = 0; i < data.length; i++) {
        const category = data[i];
        result[category.id] = category.score;
    }

    return {
        keen: {
            url,
            domain: parse(url).hostname,
        },
        ...result
    };
}

export default class KeenResultPersister implements ResultReporterInterface {
    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
        const {saveReport, folder} = config;
        const {reportFolder} = meta;

        if (!saveReport || !folder || !reportFolder) {
            return Promise.resolve();
        }

        if (!existsSync(reportFolder)) {
            return createFolder(reportFolder)
        }

        return Promise.resolve();
    }

    //@ts-ignore
    save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
        const {printer} = meta;
        var client = graphite.createClient('plaintext://localhost:2003/');
        var metrics = prepareData(url, results.reportCategories);

        return new Promise((res, rej) => {
            client.write(metrics,  (err:Error) => {
                if(err){
                    console.error(err);
                    return rej(err);
                }
               return res();
            });
        })
            .then(() => {
                client.end();
                printer.print(`Metrics sent to keen.io`);
                return Promise.resolve(results);
            })
    }
}
