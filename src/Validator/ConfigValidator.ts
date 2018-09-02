import * as joi from 'joi';

import Schema from './schema/ConfigSchema';
import {IInitialConfig} from "../Interfaces/IInitialConfig";

export default class ConfigValidator {
    public static validate(config: IInitialConfig): IInitialConfig {
        const result = joi.validate<IInitialConfig>(config, Schema);
        if (result.error) {
            throw new Error(result.error.message);
        }
        return result.value;
    }
}
