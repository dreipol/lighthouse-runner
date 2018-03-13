const path = require('path');
const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');
const log = require('fancy-log');

/**
 * Get templatefolder from installed module
 * @param {String} baseDir 
 */
function getConfigModulePath(baseDir) {
    return new Promise((res, rej) => {
        const templatePath = path.resolve(baseDir, 'node_modules', '@dreipol', 'lighthouse-config', 'config', 'template');
        if (!fs.existsSync(templatePath)) {
            return rej(new Error('Could not find template in @dreipol/lighthouse-config module'));
        }
        return res(templatePath);
    });
}

/**
 * Get all templatefiles from module
 * @param {String} templateFolder 
 */
function getTemplateFiles(templateFolder) {
    return new Promise((res, rej) => {
        glob(path.join(templateFolder, '**/*.js'), (err, files) => {
            if (err) {
                return rej(err);
            }
            return res(files);
        });
    });
}

/**
 * Copy all templatefiles
 * @param {String[]} files 
 * @param {String} target 
 */
function copyFiles(files, target) {
    let promises = [];
    for (let i = 0; i < files.length; i++) {
        promises.push(copyFile(files[i], target));
    }
    return Promise.all(promises);
}

/**
 * Copy single file into project
 * @param {String} file 
 * @param {String} target 
 */
function copyFile(file, target) {
    const basename = path.basename(file);
    target = path.join(target, basename);

    return new Promise((res, rej) => {
        const rd = fs.createReadStream(file);
        rd.on('error', err => rej(err));
        const wr = fs.createWriteStream(target);
        wr.on('error', err => rej(err));
        wr.on('close', () => res());
        rd.pipe(wr);
    });
}

/**
 * Settingup default configuration
 * @param {String} configFolder 
 */
module.exports = function writeDefaultConfig(configFolder) {
    const baseDir = process.cwd();
    configFolder = path.resolve(baseDir, configFolder);

    return getConfigModulePath(baseDir)
        .then(templatePath => {
            return getTemplateFiles(templatePath);
        })
        .then(files => {
            log(`Creating config in ${configFolder}`);
            return copyFiles(files, configFolder);
        })
        .then((files) => {
            log(`Copied ${files.length} config files`);
            log(chalk.green(`Setup completed`));
        })
        .catch(e => {
            log(chalk.red(`Error: ${e.message}`));
        })
}