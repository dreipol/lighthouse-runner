"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractPrinter {
    constructor() {
    }
    static getInstance() {
        if (!AbstractPrinter._instance) {
            AbstractPrinter._instance = AbstractPrinter.create();
        }
        return AbstractPrinter._instance;
    }
    static create() {
        throw new Error('Method not implemented');
    }
}
exports.default = AbstractPrinter;
;
