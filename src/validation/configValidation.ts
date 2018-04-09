import * as joi from 'joi';

import { LighthouseConfigInterface } from '../Interfaces';
import Schema from './ConfigSchema';

export function validate(config: LighthouseConfigInterface): Promise<LighthouseConfigInterface>  {
    const result = joi.validate(config, Schema);
    if (result.error) {
        return Promise.reject(result.error);
    }

    return Promise.resolve(result.value);
}
