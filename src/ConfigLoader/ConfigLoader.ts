import {ConfigValidator, DreihouseConfigInterface, LoggerInterface} from '@dreipol/lighthouse-config';
import {dirname, isAbsolute, resolve} from 'path';
import Dreihouse from '../Dreihouse';
import NoopLogger from '../Logger/NoopLogger';

export default class ConfigLoader {
    public load(dreihouse: Dreihouse,
                configFile: DreihouseConfigInterface | string | null,
                logger: LoggerInterface = new NoopLogger()): DreihouseConfigInterface {
        if (configFile === null) {
            logger.debug('Use internal config');
            configFile = resolve(__dirname, '../../config/base.js');
            return this.loadConfig(require(configFile), process.cwd());
        }

        if (configFile && typeof configFile === 'string' && !isAbsolute(configFile)) {
            logger.debug('Resolve relative config file to process path');
            configFile = resolve(process.cwd(), configFile);
        }

        if (configFile && typeof configFile === 'string') {
            logger.debug('Load config from file');
            return this.loadConfig(require(configFile), dirname(configFile));
        }

        if (typeof configFile === 'object') {
            logger.debug('Load config from object');
            return this.loadConfig(configFile, process.cwd());
        }

        throw new Error('Could not load config accordingly');
    }

    protected loadConfig(config: DreihouseConfigInterface, resolveFolder: string): DreihouseConfigInterface {
        config = ConfigValidator.validate(config);
        config.folder = resolve(resolveFolder, config.folder);
        return config;
    }
}
