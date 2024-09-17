const Joi = require('joi');

const validationOptions = {
    stripUnknown: true,
    abortEarly: false,
};


const planSchema = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        durationWEEKS: Joi.number().required(),
        workouts: Joi.array().items(
            Joi.object().keys({
                workout: Joi.string().required(),
                day: Joi.number().required(),
                name: Joi.string().required(),
            })
        ).min(1).required(),
    }).options(validationOptions),
    patch: Joi.object().keys({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        durationWEEKS: Joi.number().optional(),
        workouts: Joi.array().items(
            Joi.object().keys({
                workout: Joi.string().required(),
                day: Joi.number().required(),
                name: Joi.string().required(),
            })
        ).min(1).optional(),
    }).options(validationOptions),
}

module.exports = planSchema;