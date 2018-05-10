import * as joi from 'joi';

import Schema from './ConfigSchema';
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";

export default class ConfigValidator {

    static validate(config: LighthouseConfigInterface): Promise<LighthouseConfigInterface> {
        const result = joi.validate(config, Schema);
        if (result.error) {
            return Promise.reject(result.error);
        }

        return Promise.resolve(result.value);
    }

}
