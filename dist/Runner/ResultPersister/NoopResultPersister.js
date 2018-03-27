"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoopResultPersister {
    setup(meta, config) {
        return Promise.resolve();
    }
    save(meta, url, results) {
        return Promise.resolve(results);
    }
}
exports.default = NoopResultPersister;
