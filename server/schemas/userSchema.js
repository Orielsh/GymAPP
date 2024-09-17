const Joi = require('joi');
const { maxDateForAge } = require("../utils/date");
const { MIN_USER_AGE } = require("../config/common");

const validationOptions = {
    stripUnknown: true,
    abortEarly: false,
}

const userSchemas = {
    put: Joi.object().keys({
        name: Joi.object().keys({
            first: Joi.string().required(),
            last: Joi.string().required(),
        }).required(),
        image: Joi.object().keys({
            url: Joi.string().uri().pattern(/(https?:\/\/.*\.(?:png|jpg))/i, { name: 'Image URI' }).required(),
            alt: Joi.string().optional().default("Profile image"),
        }).required(),
        phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphone number' }).required(),
        birthdate: Joi.date().required().max(maxDateForAge(MIN_USER_AGE)),
        gender: Joi.string().valid("Male", "Female").required(),
        heightCM: Joi.number().required(),
        weightKG: Joi.number().required(),
        email: Joi.string().email().pattern(/^\S+@\S+$/, { name: 'email' }).required(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password' }).required(),
    }).options(validationOptions),
    patch: Joi.object().keys({
        name: Joi.object().keys({
            first: Joi.string().optional(),
            last: Joi.string().optional(),
        }).optional(),
        image: Joi.object().keys({
            url: Joi.string().uri().pattern(/(https?:\/\/.*\.(?:png|jpg))/i, { name: 'Image URI' }).optional(),
            alt: Joi.string().optional().default("Profile image"),
        }).optional(),
        phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphone number' }).optional(),
        birthdate: Joi.date().optional().max(maxDateForAge(MIN_USER_AGE)),
        gender: Joi.string().valid("Male", "Female").optional(),
        heightCM: Joi.number().optional(),
        weightKG: Joi.number().optional(),
        email: Joi.string().email().pattern(/^\S+@\S+$/, { name: 'email' }).optional(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password' }).optional(),
    }).min(1).options(validationOptions),
    changeRole: Joi.object().keys({
        role: Joi.string().valid("TRAINEE", "TRAINER").required(),
    }).min(1).options(validationOptions),
    setTrainer: Joi.object().keys({
        trainer: Joi.string().required().allow(null),
    }).options(validationOptions),
    setPlan: Joi.object().keys({
        plan: Joi.object().keys({
            plan: Joi.string().required(),
        }).required().allow(null),
    }).options(validationOptions),
}

module.exports = userSchemas;