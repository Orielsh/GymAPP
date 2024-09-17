const Joi = require('joi')
const { maxDateForAge } = require("../utils/date");
const { MIN_USER_AGE } = require("../config/common");

const validationOptions = {
    stripUnknown: true,
    abortEarly: false,
}

const schemas = {
    login:
        Joi.object().keys({
            email: Joi.string().email().pattern(/^\S+@\S+$/, { name: 'email' }).required(),
            // password rules: at least one upper case letter, at least one lower case letter, at least one number, at least one special characted, at least 7 characters total
            password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password' }).required(),
        }).options(validationOptions),

    register: Joi.object().keys({
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
}

module.exports = { schemas };