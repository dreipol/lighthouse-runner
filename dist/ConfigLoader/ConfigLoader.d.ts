import { DreihouseConfig, LoggerInterface } from '@dreipol/lighthouse-config';
import Dreihouse from '../Dreihouse';
export default class ConfigLoader {
    load(dreihouse: Dreihouse, configFile: DreihouseConfig | string | null, logger?: LoggerInterface): DreihouseConfig;
    private loadConfig(config, resolveFolder);
}
