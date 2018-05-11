import * as Joi from 'joi';

export default Joi.object().keys({
    url: Joi.string().required(),
    paths: Joi.array().items(Joi.string()).required(),
    folder: Joi.string().allow(null)
        .when('saveReport', {
            is: true,
            then: Joi.string().required(),
        }),
    tag: Joi.string().default('report').required(),
    chromeFlags: Joi.array().items(Joi.string()).required(),
    disableEmulation: Joi.boolean().required(),
    disableThrottling: Joi.boolean().required(),
    saveReport: Joi.boolean().required(),
    budget: Joi.object().required(),
    reporters: Joi.object().keys({
        modules: Joi.array().items(
            Joi.string(),
            Joi.object({
                setup: Joi.func().required(),
                handle: Joi.func().required(),
            }),
        ),
    }),
    report: Joi.object().keys({
        settings: Joi.object(),
        passes: Joi.array(),
        audits: Joi.array(),
        groups: Joi.object(),
        categories: Joi.object(),
    }).required(),
});
