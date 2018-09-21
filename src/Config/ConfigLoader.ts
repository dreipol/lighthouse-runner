import {dirname, isAbsolute, resolve} from 'path';
import NoopLogger from '../Logger/NoopLogger';
import {ILogger} from "../Logger/ILogger";
import {IDreihouseConfig} from "../Interfaces/IDreihouseConfig";
import ConfigValidator from "../Validator/ConfigValidator";
import {IInitialConfig} from "../Interfaces/IInitialConfig";
import ConfigTransformer from "../Transformer/ConfigTransformer";


/**
 * Handles the loading of the configuration
 */
export default class ConfigLoader {
    static load(configFile: IDreihouseConfig | string | null, logger: ILogger = new NoopLogger()): IDreihouseConfig {
        
        if (configFile === null) {
            logger.debug('Use internal config');
            configFile = resolve(__dirname, '../../config/desktop.js');
            return ConfigLoader.loadConfig(require(configFile), process.cwd());
        }
        
        if (configFile && typeof configFile === 'string' && !isAbsolute(configFile)) {
            logger.debug('Resolve relative config file to process path');
            configFile = resolve(process.cwd(), configFile);
        }
        
        if (configFile && typeof configFile === 'string') {
            logger.debug('Load config from file');
            return ConfigLoader.loadConfig(require(configFile), dirname(configFile));
        }
        
        if (typeof configFile === 'object') {
            logger.debug('Load config from object');
            return ConfigLoader.loadConfig(configFile, process.cwd());
        }
        
        throw new Error('Could not load config accordingly');
    }
    
    static loadConfig(config: IInitialConfig, resolveFolder: string): IDreihouseConfig {
        config = ConfigValidator.validate(config);
        config.folder = resolve(resolveFolder, config.folder);
        return ConfigTransformer.transform(config);
    }
}
