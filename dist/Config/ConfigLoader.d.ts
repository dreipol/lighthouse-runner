import { ILogger } from "../Logger/ILogger";
import { IDreihouseConfig } from "../Interfaces/IDreihouseConfig";
import { IInitialConfig } from "../Interfaces/IInitialConfig";
export default class ConfigLoader {
    static load(configFile: IDreihouseConfig | string | null, logger?: ILogger): IDreihouseConfig;
    static loadConfig(config: IInitialConfig, resolveFolder: string): IDreihouseConfig;
}
