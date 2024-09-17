const Joi = require('joi');

const validationOptions = {
    stripUnknown: true,
    abortEarly: false,
};


const workoutSchema = {
    patch: Joi.object().keys({
        name: Joi.string().optional(),
        exercises: Joi.array().items(
            Joi.object().keys({
                exercise: Joi.string().required(),
                modifications: Joi.object().keys({
                    sets: Joi.number().required(),
                    repetitions: Joi.number().required(),
                    weight: Joi.number().optional(),
                    duration: Joi.number().optional(),
                }).optional().min(1),
            })).optional(),
    }).min(1).options(validationOptions),
    create: Joi.object().keys({
        name: Joi.string().required(),
    }).options(validationOptions),
}

module.exports = workoutSchema;