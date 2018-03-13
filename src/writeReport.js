const fs = require('fs');
const url = require('url');
const path = require('path');

/**
 *  Format date
 * @param {Date} date
 * 
 * @returns {string}
 */
function formatDate(date) {
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
 * Write a report file
 *
 * @param {string} configFolder
 * @param {string} _url
 * @param {Object} results
 */
module.exports = function writeReportFile(configFolder, _url, results) {
    const d = new Date();

    if (!fs.existsSync(configFolder)) {
        fs.mkdirSync(configFolder);
    }

    const reportUrl = url.parse(_url);
    let pathname = reportUrl.pathname;
    pathname = pathname.replace(/(^\/)|(\/$)/g, '');
    pathname = pathname.replace(/\//g, '_');
    const filenamePrefix = formatDate(d);
    const filename = path.join(configFolder, `${ filenamePrefix }__${reportUrl.hostname}__${pathname}.json`);

    fs.writeFileSync(filename, JSON.stringify(results));
}