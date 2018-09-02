import {parse} from 'url';

export default function urlToPath(url: string): string {
    const reportUrl = parse(url);
    let pathname = reportUrl.pathname;
    if (!pathname) {
        throw new Error('Can not get pathname from url');
    }

    pathname = pathname.replace(/(^\/)|(\/$)/g, '');
    pathname = pathname.replace(/\//g, '_');
    return pathname;
}
