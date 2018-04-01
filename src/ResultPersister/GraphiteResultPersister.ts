import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta, ReportCategory} from '../Interfaces';
import {parse} from "url";

const GraphiteClient = require('graphite-client');

/**
 * Prepare data to be sent to graphite
 */
function prepareData(url: string, data: Array<ReportCategory>): Object {
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

/**
 * Connect to graphite server
 */
function setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
    const {persisters} = config;
    return new Promise((res, rej) => {
        if (!persisters || !persisters.graphite || !persisters.graphite.host) {
            return rej(new Error('persisters.graphite.host not found in the config'));
        }

        const graphite = new GraphiteClient(persisters.graphite.host, 2003, 'UTF-8', 3000, function () {
        });

        graphite.on('error', function (error: Error) {
            meta.printer.print('Graphite connection failure. ' + error);
        });


        graphite.connect(() => {
            meta.printer.print('Graphite connection established');
            return res(graphite);
        });
    })
}

/**
 * Save result metrics to graphite server
 */
export default function save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
    return setup(meta, config)
        .then((graphite:any) => {
            const {printer} = meta;
            const {persisters} = config;

            if (!persisters || !persisters.graphite || !persisters.graphite.id || !persisters.graphite.host) {
                return Promise.reject(new Error('persisters.graphite not found or incomplete config'));
            }

            let metrics: any = {};
            metrics[persisters.graphite.id] = prepareData(url, results.reportCategories);

            return new Promise((res) => {
                graphite.write(metrics, Date.now(), (err: Error) => {
                    printer.print("Failed to write metrics to metrics server. err: " + err)
                });
                return res();
            })
                .then(() => {
                    graphite.end();
                    printer.print(`Metrics sent to graphite`);
                    return Promise.resolve(results);
                })
        })
}
