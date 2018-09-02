import { IInitialConfig } from "../Interfaces/IInitialConfig";
import { IDreihouseConfig } from "../Interfaces/IDreihouseConfig";
export default class ConfigTransformer {
    static transform(config: IInitialConfig): IDreihouseConfig;
}
