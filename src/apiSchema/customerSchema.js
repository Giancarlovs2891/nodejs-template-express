const Joi = require('@hapi/joi');

module.exports.createCustomerSchema = Joi.object().keys({
    email: Joi.string().required(),
    companyName: Joi.string().required(),
    companyType: Joi.string().required(),
    contactName: Joi.string().required(),
    position: Joi.string().allow(''),
    einvatss: Joi.string().allow(''),
    eori: Joi.string().allow(''),
    yearsInBusiness: Joi.number().allow(''),
    status: Joi.string().required(),
    currency: Joi.string(),
    approvedAmount: Joi.number(),
    paymentTerms: Joi.string(),
    phone: Joi.string(),
    country: Joi.string(),
    address1: Joi.string(),
    address2: Joi.string(),
    city: Joi.string(),
    state: Joi.string().when(
        'country', { is: 'USA', then: Joi.required() }
    ),
    zip: Joi.string().when(
        'country', { is: 'USA', then: Joi.required() }
    ),
    paymentTerms: Joi.string(),
    paymentMethod: Joi.string(),
    vip: Joi.boolean()
});

module.exports.updateCustomerSchema = Joi.object().keys({
    email: Joi.string(),
    companyName: Joi.string().allow(''),
    companyType: Joi.string().allow(''),
    contactName: Joi.string().allow(''),
    phone: Joi.string().allow(''),
    position: Joi.string().allow(''),
    einvatss: Joi.string().allow(''),
    eori: Joi.string().allow(''),
    yearsInBusiness: Joi.number().allow(''),
    country: Joi.string().allow(''),
    address1: Joi.string().allow(''),
    address2: Joi.string().allow(''),
    city: Joi.string().allow(''),
    state: Joi.string().allow(''),
    zip: Joi.string().allow(''),
    status: Joi.string().allow(''),
    currency: Joi.string().allow(''),
    approvedAmount: Joi.number().allow(''),
    paymentTerms: Joi.string().allow(''),
    paymentMethod: Joi.string().allow(''),
    vip: Joi.boolean()
});

module.exports.getAllCustomerSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string()
});

module.exports.signup = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

module.exports.login = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

module.exports.getAllCustomerQuotesSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string()
});