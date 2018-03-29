import { parse } from 'url';
import mkdirp from 'mkdirp';

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

/**
 *
 * @param path
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
