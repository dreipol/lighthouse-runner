import ResultReporterInterface from './ResultPersisterInterface';
import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta, ReportCategory} from '../Interfaces';
import {parse} from "url";

const GraphiteClient = require('graphite-client');


export default class GraphiteResultPersister implements ResultReporterInterface {
    graphite: any;

    prepareData(url: string, data: Array<ReportCategory>): Object {
        let result: any = {};
        for (let i = 0; i < data.length; i++) {
            const category = data[i];
            result[category.id] = category.score;
        }

        return {
            url,
            domain: parse(url).hostname,
            tag: parse(url).hostname,
            metrics: result
        };
    }

    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
        const {persisters} = config;
        return new Promise((res, rej) => {
            if (!persisters || !persisters.graphite || !persisters.graphite.host) {
                return rej(new Error());
            }

            this.graphite = new GraphiteClient(persisters.graphite.host, 2003, 'UTF-8', 3000, function () {
            });

            this.graphite.on('error', function (error: Error) {
                meta.printer.print('Graphite connection failure. ' + error);
            });


            this.graphite.connect(() => {
                meta.printer.print('Graphite connection established');
                return res();
            });
        })
    }

    //@ts-ignore
    save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
        const {printer} = meta;

        const metrics = this.prepareData(url, results.reportCategories);

        return new Promise((res) => {
            this.graphite.write(metrics, Date.now(), (err: Error) => {
                printer.print("Failed to write metrics to metrics server. err: " + err)
            });
            return res();
        })
            .then(() => {
                this.graphite.end();
                printer.print(`Metrics sent to graphite`);
                return Promise.resolve(results);
            })
    }
}
