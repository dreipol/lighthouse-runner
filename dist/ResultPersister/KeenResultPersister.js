"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const helpers_1 = require("./helpers");
const url_1 = require("url");
var graphite = require('graphite');
function prepareData(url, data) {
    let result = {};
    for (let i = 0; i < data.length; i++) {
        const category = data[i];
        result[category.id] = category.score;
    }
    return Object.assign({ keen: {
            url,
            domain: url_1.parse(url).hostname,
        } }, result);
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
        var client = graphite.createClient('plaintext://localhost:2003/');
        var metrics = prepareData(url, results.reportCategories);
        return new Promise((res, rej) => {
            client.write(metrics, (err) => {
                if (err) {
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
        });
    }
}
exports.default = KeenResultPersister;
