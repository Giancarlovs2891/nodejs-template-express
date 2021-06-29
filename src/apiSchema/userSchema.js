const Joi = require('@hapi/joi');

module.exports.createUserSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});

module.exports.updateUserSchema = Joi.object().keys({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});

module.exports.updateUserPasswordSchema = Joi.object().keys({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
});

module.exports.signup = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});

module.exports.login = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

module.exports.forgotPassword = Joi.object().keys({
    email: Joi.string().required()
});

module.exports.resetUserPassword = Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().required()
});