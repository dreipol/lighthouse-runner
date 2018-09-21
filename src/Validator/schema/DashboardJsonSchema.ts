import * as Joi from 'joi';

export default Joi.object().keys({
    categories: Joi.array().items(Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        manualDescription: Joi.string(),
        id: Joi.string().required(),
        score: Joi.number().min(0).max(100).required(),
    })),
    budget: Joi.object(),
    url: Joi.string().required(),
    tag: Joi.string().required(),
    key: Joi.string().required(),
    version: Joi.string().required(),
});
