import {resolve, join, basename} from 'path';
import {existsSync, createReadStream, createWriteStream} from 'fs';
import glob from 'glob';
import chalk from 'chalk';
import {info as log} from 'fancy-log';

/**
 * Get template folder from installed module
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
 * Get all template files from module
 */
function getTemplateFiles(templateFolder: string): Promise<string[]> {
    return new Promise((res, rej) => {
        glob(join(templateFolder, '**/*.js'), (err: Error | null, files: string[]) => {
            if (err) {
                return rej(err);
            }
            return res(files);
        });
    });
}

/**
 * Copy all template files
 */
async function copyFiles(files: string[], target: string): Promise<void> {
    for (let i = 0; i < files.length; i++) {
        await copyFile(files[i], target);
    }
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

export default async function writeDefaultConfig(configFolder: string): Promise<void> {
    const baseDir = process.cwd();
    configFolder = resolve(baseDir, configFolder);
    try {
        const templatePath = await getConfigModulePath(baseDir);
        const files = await getTemplateFiles(templatePath);
        log(`Creating config in ${configFolder}`);
        await copyFiles(files, configFolder);
        log(`Copied ${files.length} config files`);
        log(chalk.green(`Setup completed`));
    } catch (e) {
        log(chalk.red(`Error: ${e.message}`));
    }
}
