import { ILogger } from '../Logger/ILogger';
import { IDreihouseConfig } from '../Interfaces/IDreihouseConfig';
export default class ConfigLoader {
    static load(configFile: IDreihouseConfig | string | null, logger?: ILogger): IDreihouseConfig;
    private static loadConfig;
    private static loadConfigFile;
}
