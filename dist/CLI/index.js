#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../Runner/index");
const writeDefaultConfig_js_1 = __importDefault(require("./writeDefaultConfig.js"));
const args_1 = __importDefault(require("./args"));
const args = args_1.default({
    args: ['config', 'port'],
    flags: ['setup']
});
if (args.setup) {
    writeDefaultConfig_js_1.default(args.config);
}
else {
    index_1.execute(args.config, args.port);
}
