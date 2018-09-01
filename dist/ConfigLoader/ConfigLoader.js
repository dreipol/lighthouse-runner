"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lighthouse_config_1 = require("@dreipol/lighthouse-config");
const path_1 = require("path");
const NoopLogger_1 = __importDefault(require("../Logger/NoopLogger"));
class ConfigLoader {
    static load(dreihouse, configFile, logger = new NoopLogger_1.default()) {
        if (configFile === null) {
            logger.debug('Use internal config');
            configFile = path_1.resolve(__dirname, '../../config/base.js');
            return ConfigLoader.loadConfig(require(configFile), process.cwd());
        }
        if (configFile && typeof configFile === 'string' && !path_1.isAbsolute(configFile)) {
            logger.debug('Resolve relative config file to process path');
            configFile = path_1.resolve(process.cwd(), configFile);
        }
        if (configFile && typeof configFile === 'string') {
            logger.debug('Load config from file');
            return ConfigLoader.loadConfig(require(configFile), path_1.dirname(configFile));
        }
        if (typeof configFile === 'object') {
            logger.debug('Load config from object');
            return ConfigLoader.loadConfig(configFile, process.cwd());
        }
        throw new Error('Could not load config accordingly');
    }
    static loadConfig(config, resolveFolder) {
        config = lighthouse_config_1.ConfigValidator.validate(config);
        config.folder = path_1.resolve(resolveFolder, config.folder);
        return config;
    }
}
exports.default = ConfigLoader;
//# sourceMappingURL=ConfigLoader.js.map