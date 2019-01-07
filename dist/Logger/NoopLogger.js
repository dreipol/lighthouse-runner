"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoopLogger {
    debug(...args) {
    }
    error(...args) {
    }
    info(...args) {
    }
    setLevel(level) {
    }
    getLevel() {
        return 0;
    }
}
exports.default = NoopLogger;
//# sourceMappingURL=NoopLogger.js.map