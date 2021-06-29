const Joi = require('@hapi/joi');

module.exports.createCustomerAddressSchema = Joi.object().keys({
    email: Joi.string().required(),
    contactName: Joi.string().required(),
    phone: Joi.string().required(),
    nickname: Joi.string().allow(''),
    country: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string().allow(''),
    city: Joi.string().required(),
    state: Joi.string().when(
        'country', { is: 'USA', then: Joi.required() }
    ),
    zip: Joi.string().when(
        'country', { is: 'USA', then: Joi.required() }
    ),
    customer: Joi.string(),
    defaultOrigin: Joi.boolean().required(),
    defaultDestination: Joi.boolean().required(),
    isBillingAddress: Joi.boolean().allow(''),
    isCorporateAddress: Joi.boolean().allow('')
});

module.exports.updateCustomerAddressSchema = Joi.object().keys({
    email: Joi.string(),
    contactName: Joi.string(),
    phone: Joi.string(),
    nickname: Joi.string(),
    country: Joi.string(),
    address1: Joi.string(),
    address2: Joi.string().allow(''),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.string(),
    customer: Joi.string(),
    defaultOrigin: Joi.boolean(),
    defaultDestination: Joi.boolean(),
    isBillingAddress: Joi.boolean().allow(''),
    isCorporateAddress: Joi.boolean().allow('')
});

module.exports.getAllCustomerAddressesSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string()
});