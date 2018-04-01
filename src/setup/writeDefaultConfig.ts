import { resolve, join, basename } from 'path';
import { existsSync, createReadStream, createWriteStream } from 'fs';
import glob from 'glob';
import chalk from 'chalk';
import { info as log } from 'fancy-log';

/**
 * Get templatefolder from installed module
 */
function getConfigModulePath(baseDir: string): Promise<string> {
    return new Promise((res, rej) => {
        const templatePath = resolve(baseDir, 'node_modules', '@dreipol', 'lighthouse-config', 'config', 'template');
        if (!existsSync(templatePath)) {
            return rej(new Error('Could not find template in @dreipol/lighthouse-config module'));
        }
        return res(templatePath);
    });
}

/**
 * Get all templatefiles from module
 */
function getTemplateFiles(templateFolder: string): Promise<Array<string>> {
    return new Promise((res, rej) => {
        glob(join(templateFolder, '**/*.js'), (err: Error | null, files: Array<string>) => {
            if (err) {
                return rej(err);
            }
            return res(files);
        });
    });
}

/**
 * Copy all templatefiles
 */
function copyFiles(files: Array<string>, target: string): Promise<Array<any>> {
    let promises = [];
    for (let i = 0; i < files.length; i++) {
        promises.push(copyFile(files[i], target));
    }
    return Promise.all(promises);
}

/**
 * Copy single file into project
 */
function copyFile(file: string, target: string): Promise<void> {
    target = join(target, basename(file));

    return new Promise((res, rej) => {
        const rd = createReadStream(file);
        rd.on('error', (err: Error) => rej(err));
        const wr = createWriteStream(target);
        wr.on('error', (err: Error) => rej(err));
        wr.on('close', () => res());
        rd.pipe(wr);
    });
}

/**
 * Setting up default configuration
 *
 */
export default function writeDefaultConfig(configFolder: string): Promise<void> {
    const baseDir = process.cwd();
    configFolder = resolve(baseDir, configFolder);

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
