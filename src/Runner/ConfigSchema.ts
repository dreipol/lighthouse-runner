import * as Joi from 'joi';

export default Joi.object().keys({
    url: Joi.string(),
    paths: Joi.array().items(Joi.string()),
    folder: Joi.string()/*.when('saveReport', {
        is: Joi.boolean().truthy(),
    })*/,
    chromeFlags: Joi.array().items(Joi.string()),
    disableEmulation: Joi.boolean(),
    disableThrottling: Joi.boolean(),
    saveReport: Joi.boolean(),
    budget: Joi.object(),
    report: Joi.object().keys({
        settings: Joi.object(),
        passes: Joi.array(),
        audits: Joi.array(),
        groups: Joi.object(),
        categories: Joi.object(),
    }),
});