import * as Joi from 'joi';

export default Joi.object().keys({
    paths: Joi.array().items(Joi.string()).required(),
    folder: Joi.string().allow(null).required(),
    tag: Joi.string().default('report').required(),
    chromeFlags: Joi.array().items(Joi.string()).required(),
    disableEmulation: Joi.boolean().required(),
    disableThrottling: Joi.boolean().required(),
    budget: Joi.object().required(),
    initialPageload: Joi.boolean(),
    audits: Joi.array(),
    gatherers: Joi.array(),
    preAuditScripts: Joi.array(),
});
