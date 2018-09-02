import * as joi from 'joi';

import Schema from './schema/DashboardJsonSchema';
import IJSONReportResult from "../Interfaces/IJSONReportResult";

export default class DashboardResultValidator {
    public static validate(config: IJSONReportResult): IJSONReportResult {
        const result = joi.validate<IJSONReportResult>(config, Schema);
        if (result.error) {
            throw new Error(result.error.message);
        }
        return result.value;
    }
}
