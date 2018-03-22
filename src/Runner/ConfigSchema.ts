import * as Joi from 'joi';

export default Joi.object().keys({
    url: Joi.string(),
    paths: Joi.string(),
    folder: Joi.string(),
    chromeFlags: Joi.string(),
    disableEmulation: Joi.string(),
    disableThrottling: Joi.string(),
    saveReport: Joi.string(),
    budget: Joi.string(),
    report: Joi.string(),
})