import * as Joi from 'joi';

export default Joi.object().keys({
    url: Joi.string().required(),
    paths: Joi.array().items(Joi.string()).required(),
    folder: Joi.string().allow(null)
        .when('saveReport', {
            is: true,
            then: Joi.string().required(),
        }),
    chromeFlags: Joi.array().items(Joi.string()).required(),
    disableEmulation: Joi.boolean().required(),
    disableThrottling: Joi.boolean().required(),
    saveReport: Joi.boolean().required(),
    budget: Joi.object().required(),
    persisters: Joi.object().keys({
        graphite: Joi.object().keys({
            host: Joi.string().required(),
            id: Joi.string().required(),
        })
    }),
    report: Joi.object().keys({
        settings: Joi.object(),
        passes: Joi.array(),
        audits: Joi.array(),
        groups: Joi.object(),
        categories: Joi.object(),
    }).required(),
});
