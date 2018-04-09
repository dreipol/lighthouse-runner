import { parse } from 'url';
import mkdirp from 'mkdirp';
import { join } from "path";
import { writeFileSync, readFileSync } from "fs";

/**
 *  Format date
 */
export function formatDate(date: Date): string {
    let year = date.getUTCFullYear().toString();
    let month = date.getUTCMonth().toString();
    let day = date.getUTCDay().toString();
    let h = date.getUTCHours().toString();
    let m = date.getUTCMinutes().toString();
    let s = date.getUTCSeconds().toString();

    // Don't know why padding of 3 works. Shouldn't it be 2??????????
    month = month.padStart(3 - month.length, '0');
    day = day.padStart(3 - day.length, '0');
    h = h.padStart(3 - h.length, '0');
    m = m.padStart(3 - m.length, '0');
    s = s.padStart(3 - s.length, '0');

    return `${year}${month}${day}-${h}${m}${s}`;
}

/**
 * Extract pathname for filename from url
 *
 */
export function getPathname(url: string): string {

    const reportUrl = parse(url);
    let pathname = reportUrl.pathname;
    if (!pathname) {
        throw new Error('Can not get pathname from url');
    }

    pathname = pathname.replace(/(^\/)|(\/$)/g, '');
    pathname = pathname.replace(/\//g, '_');
    return pathname;
}

/**
 * create a folder
 */
export function createFolder(path: string): Promise<undefined> {
    return new Promise((res, rej) => {

        mkdirp(path, (err) => {
            if (err) {
                return rej(err);
            }
            return res();
        });
    });
}

/**
 * Write file
 */
export function writeFile(url: string, folder: string, content: string, type: string, prefix: string = '', suffix: string = ''): void {

    const reportUrl = parse(url);
    const pathname = getPathname(url);
    const filenamePrefix = formatDate(new Date());
    if(suffix){
        suffix = `.${suffix}`
    }
    const filename = join(folder, `${prefix}${filenamePrefix}__${reportUrl.hostname}__${pathname}${suffix}.${type}`);

    writeFileSync(filename, content);
}

/**
 * Read file
 */
export function readFile(path: string): string {
    return readFileSync(path, 'utf8');
}
