"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const GraphiteClient = require('graphite-client');
class GraphiteResultPersister {
    prepareData(url, data) {
        let result = {};
        for (let i = 0; i < data.length; i++) {
            const category = data[i];
            result[category.id] = category.score;
        }
        return {
            url,
            domain: url_1.parse(url).hostname,
            tag: url_1.parse(url).hostname,
            metrics: result
        };
    }
    setup(meta, config) {
        const { persisters } = config;
        return new Promise((res, rej) => {
            if (!persisters || !persisters.graphite || !persisters.graphite.host) {
                return rej(new Error('persisters.graphite.host not found in the config'));
            }
            this.graphite = new GraphiteClient(persisters.graphite.host, 2003, 'UTF-8', 3000, function () {
            });
            this.graphite.on('error', function (error) {
                meta.printer.print('Graphite connection failure. ' + error);
            });
            this.graphite.connect(() => {
                meta.printer.print('Graphite connection established');
                return res();
            });
        });
    }
    save(meta, config, url, results) {
        const { printer } = meta;
        const { persisters } = config;
        if (!persisters || !persisters.graphite || !persisters.graphite.id || !persisters.graphite.host) {
            return Promise.reject(new Error('persisters.graphite not found or incomplete config'));
        }
        let metrics = {};
        metrics[persisters.graphite.id] = this.prepareData(url, results.reportCategories);
        return new Promise((res) => {
            this.graphite.write(metrics, Date.now(), (err) => {
                printer.print("Failed to write metrics to metrics server. err: " + err);
            });
            return res();
        })
            .then(() => {
            this.graphite.end();
            printer.print(`Metrics sent to graphite`);
            return Promise.resolve(results);
        });
    }
}
exports.default = GraphiteResultPersister;
