"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const glob_1 = __importDefault(require("glob"));
const chalk_1 = __importDefault(require("chalk"));
const fancy_log_1 = require("fancy-log");
function getConfigModulePath(baseDir) {
    return new Promise((res, rej) => {
        const templatePath = path_1.resolve(baseDir, 'node_modules', '@dreipol', 'lighthouse-config', 'config', 'template');
        if (!fs_1.existsSync(templatePath)) {
            return rej(new Error('Could not find template in @dreipol/lighthouse-config module'));
        }
        return res(templatePath);
    });
}
function getTemplateFiles(templateFolder) {
    return new Promise((res, rej) => {
        glob_1.default(path_1.join(templateFolder, '**/*.js'), (err, files) => {
            if (err) {
                return rej(err);
            }
            return res(files);
        });
    });
}
function copyFiles(files, target) {
    let promises = [];
    for (let i = 0; i < files.length; i++) {
        promises.push(copyFile(files[i], target));
    }
    return Promise.all(promises);
}
function copyFile(file, target) {
    target = path_1.join(target, path_1.basename(file));
    return new Promise((res, rej) => {
        const rd = fs_1.createReadStream(file);
        rd.on('error', (err) => rej(err));
        const wr = fs_1.createWriteStream(target);
        wr.on('error', (err) => rej(err));
        wr.on('close', () => res());
        rd.pipe(wr);
    });
}
function writeDefaultConfig(configFolder) {
    const baseDir = process.cwd();
    configFolder = path_1.resolve(baseDir, configFolder);
    return getConfigModulePath(baseDir)
        .then(templatePath => {
        return getTemplateFiles(templatePath);
    })
        .then(files => {
        fancy_log_1.info(`Creating config in ${configFolder}`);
        return copyFiles(files, configFolder);
    })
        .then((files) => {
        fancy_log_1.info(`Copied ${files.length} config files`);
        fancy_log_1.info(chalk_1.default.green(`Setup completed`));
    })
        .catch(e => {
        fancy_log_1.info(chalk_1.default.red(`Error: ${e.message}`));
    });
}
exports.default = writeDefaultConfig;
