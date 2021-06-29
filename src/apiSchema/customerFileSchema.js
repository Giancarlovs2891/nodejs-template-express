const Joi = require('@hapi/joi');

module.exports.createCustomerFileSchema = Joi.object().keys({
    filename: Joi.string(),
    attachtment: Joi.binary(),
    user: Joi.string(),
    customer: Joi.string()
});

module.exports.updateCustomerFileSchema = Joi.object().keys({
    filename: Joi.string(),
    attachtment: Joi.binary(),
    user: Joi.string(),
    customer: Joi.string()
});

module.exports.getAllCustomerFilesSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string()
});