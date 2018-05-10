import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
export default class ConfigValidator {
    static validate(config: LighthouseConfigInterface): Promise<LighthouseConfigInterface>;
}
