"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const NoopLogger_1 = __importDefault(require("../Logger/NoopLogger"));
const ConfigValidator_1 = __importDefault(require("../Validator/ConfigValidator"));
const ConfigTransformer_1 = __importDefault(require("../Transformer/ConfigTransformer"));
class ConfigLoader {
    static load(configFile, logger = new NoopLogger_1.default()) {
        if (configFile === null) {
            logger.debug('Use internal config');
            configFile = path_1.resolve(__dirname, '../../config/desktop.js');
            return ConfigLoader.loadConfigFile(configFile, process.cwd());
        }
        if (typeof configFile === 'string') {
            logger.debug('Resolve relative config file to process path');
            if (!path_1.isAbsolute(configFile)) {
                configFile = path_1.resolve(process.cwd(), configFile);
            }
            return ConfigLoader.loadConfigFile(configFile);
        }
        if (typeof configFile === 'object') {
            logger.debug('Load config from object');
            return ConfigLoader.loadConfig(configFile, process.cwd());
        }
        throw new Error('Could not load config accordingly');
    }
    static loadConfig(config, resolveFolder) {
        config = ConfigValidator_1.default.validate(config);
        config.folder = path_1.resolve(resolveFolder, config.folder);
        return ConfigTransformer_1.default.transform(config);
    }
    static loadConfigFile(file, relativeFolder) {
        relativeFolder = relativeFolder || path_1.dirname(file);
        const config = require(file);
        return ConfigLoader.loadConfig(config, relativeFolder);
    }
}
exports.default = ConfigLoader;
//# sourceMappingURL=ConfigLoader.js.map