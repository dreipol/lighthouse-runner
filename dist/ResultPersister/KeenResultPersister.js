"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const helpers_1 = require("./helpers");
const url_1 = require("url");
var GraphiteClient = require('graphite-client');
const GRAPHITE_HOST = "localhost";
function prepareData(url, data) {
    let result = {};
    for (let i = 0; i < data.length; i++) {
        const category = data[i];
        result[category.id] = category.score;
    }
    return {
        url,
        domain: url_1.parse(url).hostname,
        metrics: result
    };
}
class KeenResultPersister {
    setup(meta, config) {
        const { saveReport, folder } = config;
        const { reportFolder } = meta;
        if (!saveReport || !folder || !reportFolder) {
            return Promise.resolve();
        }
        if (!fs_1.existsSync(reportFolder)) {
            return helpers_1.createFolder(reportFolder);
        }
        return Promise.resolve();
    }
    save(meta, config, url, results) {
        const { printer } = meta;
        var graphite = new GraphiteClient(GRAPHITE_HOST, 2003, 'UTF-8', 3000, function () {
        });
        graphite.on('error', function (error) {
            console.log(error);
            printer.print('Graphite connection failure. ' + error);
        });
        graphite.connect(() => {
            printer.print('Graphite connected');
        });
        var metrics = prepareData(url, results.reportCategories);
        return new Promise((res) => {
            graphite.write(metrics, Date.now(), (err) => {
                printer.print("Failed to write metrics to metrics server. err: " + err);
            });
            return res();
        })
            .then(() => {
            graphite.end();
            printer.print(`Metrics sent to keen.io`);
            return Promise.resolve(results);
        });
    }
}
exports.default = KeenResultPersister;
