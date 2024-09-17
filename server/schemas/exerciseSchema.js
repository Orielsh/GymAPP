const Joi = require('joi');

const validationOptions = {
    stripUnknown: true,
    abortEarly: false,
};


const exerciseSchema = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        sets: Joi.number().required(),
        repetitions: Joi.number().required(),
        weight: Joi.number().optional(),
        duration: Joi.number().optional(),
    }).options(validationOptions),
    put: Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        sets: Joi.number().required(),
        repetitions: Joi.number().required(),
        weight: Joi.number().optional(),
        duration: Joi.number().optional(),
    }).options(validationOptions),
    delete: Joi.object().keys({
        _id: Joi.string().required(),
    }).options(validationOptions),
}

module.exports = { exerciseSchema };