import { LoggerInterface, DreihouseConfigInterface } from '@dreipol/lighthouse-config';
import Dreihouse from '../Dreihouse';
export default class ConfigLoader {
    load(dreihouse: Dreihouse, configFile: DreihouseConfigInterface | string | null, logger?: LoggerInterface): DreihouseConfigInterface;
    protected loadConfig(config: DreihouseConfigInterface, resolveFolder: string): DreihouseConfigInterface;
}
