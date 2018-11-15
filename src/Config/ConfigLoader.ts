import { dirname, isAbsolute, resolve } from 'path';
import NoopLogger from '../Logger/NoopLogger';
import { ILogger } from '../Logger/ILogger';
import { IDreihouseConfig } from '../Interfaces/IDreihouseConfig';
import ConfigValidator from '../Validator/ConfigValidator';
import { IInitialConfig } from '../Interfaces/IInitialConfig';
import ConfigTransformer from '../Transformer/ConfigTransformer';

/**
 * Handles the loading of the configuration
 */
export default class ConfigLoader {
    public static load(configFile: IDreihouseConfig | string | null, logger: ILogger = new NoopLogger()): IDreihouseConfig {

        if (configFile === null) {
            logger.debug('Use internal config');
            configFile = resolve(__dirname, '../../config/desktop.js');
            return ConfigLoader.loadConfigFile(configFile, process.cwd());
        }

        if (typeof configFile === 'string') {
            logger.debug('Resolve relative config file to process path');
            if (!isAbsolute(configFile)) {
                configFile = resolve(process.cwd(), configFile);
            }
            return ConfigLoader.loadConfigFile(configFile);
        }

        if (typeof configFile === 'object') {
            logger.debug('Load config from object');
            return ConfigLoader.loadConfig(configFile, process.cwd());
        }

        throw new Error('Could not load config accordingly');
    }

    private static loadConfig(config: IInitialConfig, resolveFolder: string): IDreihouseConfig {
        config = ConfigValidator.validate(config);
        config.folder = resolve(resolveFolder, config.folder);
        return ConfigTransformer.transform(config);
    }

    private static loadConfigFile(file: string, relativeFolder?: string) {
        relativeFolder = relativeFolder || dirname(file);
        const config = require(file);
        return ConfigLoader.loadConfig(config, relativeFolder);
    }
}
