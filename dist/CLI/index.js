#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = __importDefault(require("./commands/setup"));
const report_1 = __importDefault(require("./commands/report"));
require('yargs')
    .command(setup_1.default)
    .command(report_1.default)
    .argv;
