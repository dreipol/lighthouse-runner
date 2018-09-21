"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mkdirp = require("mkdirp");
function createFolder(path) {
    return new Promise((res, rej) => {
        mkdirp(path, (err) => {
            if (err) {
                return rej(err);
            }
            return res();
        });
    });
}
exports.default = createFolder;
//# sourceMappingURL=createFolder.js.map