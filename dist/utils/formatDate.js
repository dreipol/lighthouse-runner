"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date) {
    const year = date.getUTCFullYear().toString();
    let month = (date.getUTCMonth() + 1).toString();
    let day = date.getUTCDate().toString();
    let h = date.getUTCHours().toString();
    let m = date.getUTCMinutes().toString();
    let s = date.getUTCSeconds().toString();
    month = month.padStart(3 - month.length, '0');
    day = day.padStart(3 - day.length, '0');
    h = h.padStart(3 - h.length, '0');
    m = m.padStart(3 - m.length, '0');
    s = s.padStart(3 - s.length, '0');
    return `${year}${month}${day}-${h}${m}${s}`;
}
exports.default = formatDate;
//# sourceMappingURL=formatDate.js.map