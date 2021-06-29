const Joi = require('@hapi/joi');

module.exports.createCustomerNoteSchema = Joi.object().keys({
    details: Joi.string().required(),
    user: Joi.string(),
    customer: Joi.string()
});

module.exports.updateCustomerNoteSchema = Joi.object().keys({
    details: Joi.string().required(),
    user: Joi.string(),
    customer: Joi.string()
});

module.exports.getAllCustomerNotesSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string()
});