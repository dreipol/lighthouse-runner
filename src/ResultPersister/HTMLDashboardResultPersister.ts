import { existsSync } from 'fs';
import { resolve } from 'path';

import { createFolder, writeFile, readFile } from './helpers';
import { LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta, ReportCategory } from '../Interfaces';

/**
 * Setup required folders
 */
function setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
    const { saveReport, folder } = config;
    const { reportFolder } = meta;

    if (!saveReport || !folder || !reportFolder) {
        return Promise.resolve();
    }

    if (!existsSync(reportFolder)) {
        return createFolder(reportFolder)
    }

    return Promise.resolve();
}

function generateReportHtml(categories: Array<ReportCategory>) {
    const shrinkedCategories = categories.map((item) => {
        return { name: item.name, score: item.score };
    });

    const categoryNames = categories.map((item) => {
        return item.name;
    });

    let content = readFile(resolve(__dirname, '../../Templates/dashboard.html'));
    const options = {
        data: {
            json: shrinkedCategories,
            keys: {
                value: ["score"]
            },
            type: "bar",
            labels: true
        },
        axis: {
            x: {
                type: "category",
                categories: categoryNames
            },
            y: {
                show: false,
                label: "Score",
                max: 100,
                min: 0,
                top: 0,
                bottom: 0
            }
        },
        legend: {
            show: false
        },
        color: {
            pattern: ["#607D8B"],
            threshold: {
                value: [30, 90]
            }
        },
        bindto: '#chart'
    };
    return content.replace('INJECT_CONFIG', JSON.stringify(options));
}

/**
 * Create html file with reporter result
 */
export default function save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
    return setup(meta, config)
        .then(() => {
            const { reportFolder, printer } = meta;
            const { saveReport } = config;

            if (reportFolder && saveReport) {
                const html = generateReportHtml(results.reportCategories);
                writeFile(url, reportFolder, html, 'html', 'dashboard_');
                printer.print('HTML Dashboard File created')
            }
            return results;
        });
}

