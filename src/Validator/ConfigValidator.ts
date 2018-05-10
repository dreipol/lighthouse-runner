import * as joi from 'joi';

import Schema from './ConfigSchema';
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";

export default class ConfigValidator {

    static validate(config: LighthouseConfigInterface): LighthouseConfigInterface {
        const result = joi.validate(config, Schema);
        if (result.error) {
            throw new Error(result.error.message)
        }
        return result.value;
    }

}
