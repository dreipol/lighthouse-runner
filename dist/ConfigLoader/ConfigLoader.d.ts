import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
import Dreihouse from '../Dreihouse';
export default class ConfigLoader {
    static load(dreihouse: Dreihouse, configFile: DreihouseConfigInterface | string | null, logger?: LoggerInterface): DreihouseConfigInterface;
    static loadConfig(config: DreihouseConfigInterface, resolveFolder: string): DreihouseConfigInterface;
}
