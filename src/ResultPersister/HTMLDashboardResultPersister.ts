import {existsSync} from 'fs';
import {resolve} from 'path';

import {createFolder, writeFile, readFile} from './helpers';
import {
    LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta, ReportCategory,
    BudgetInterface
} from '../Interfaces';

/**
 * Setup required folders
 */
function setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
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

function generateReportHtml(url: string, categories: Array<ReportCategory>, budget: BudgetInterface) {
    const shrinkedCategories = categories.map((item) => {
        return item.score;
    });

    const shrinkedBudget = categories.map( (item) => {
        return budget[item.id] ? budget[item.id] : null;
    });

    const categoryNames = categories.map((item) => {
        return item.name;
    });

    let content = readFile(resolve(__dirname, '../../Templates/dashboard.html'));
    const options = {
        data: {
            columns: [
                ['Report', ...shrinkedCategories],
                ['Budget', ...shrinkedBudget],
            ],
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
            pattern: ["#607D8B", "#66bb6a"],
        },
        size: {
            height: 340
        },
        bindto: '#chart'
    };


    content = content.replace('INJECT_URL', url);
    return content.replace('INJECT_CONFIG', JSON.stringify(options));
}

/**
 * Create html file with reporter result
 */
export default function save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
    return setup(meta, config)
        .then(() => {
            const {reportFolder, printer} = meta;
            const {saveReport} = config;

            if (reportFolder && saveReport) {
                const html = generateReportHtml(url, results.reportCategories, config.budget);
                writeFile(url, reportFolder, html, 'html', 'dashboard_');
                printer.print('HTML Dashboard File created')
            }
            return results;
        });
}

