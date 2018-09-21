"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
function urlToPath(url) {
    const reportUrl = url_1.parse(url);
    let pathname = reportUrl.pathname;
    if (!pathname) {
        throw new Error('Can not get pathname from url');
    }
    pathname = pathname.replace(/(^\/)|(\/$)/g, '');
    pathname = pathname.replace(/\//g, '_');
    return pathname;
}
exports.default = urlToPath;
//# sourceMappingURL=urlToPath.js.map