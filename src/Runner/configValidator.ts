import * as joi from 'joi';

import { LighthouseConfigInterface } from './Interfaces';
import Schema from './ConfigSchema';

export default function validate(config: LighthouseConfigInterface) {
    const result = joi.validate(config, Schema);
    return result.error === null;

}