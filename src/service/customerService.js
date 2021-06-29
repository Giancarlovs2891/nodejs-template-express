const Customer = require('../database/models/customerModel');
const constants = require('../constants');
const { formatMongoData, checkObjectId, createSortObject, createFilterObject } = require('../helper/dbHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUniqueCode = async () => {
    const code = Math.random().toString(36).slice(2).substring(0,5).toUpperCase()
    let customer = await Customer.findOne({ code });
    if (customer) {
        return await getUniqueCode();
    }
    return code;
};

module.exports.createCustomer = async (serviceData) => {
    try {
        let customer = new Customer({ ...serviceData });
        customer.code = await getUniqueCode();
        customer.password = await bcrypt.hash('password', 12);
        const validateCustomer = await Customer.findOne({ email: customer.email });
        if (validateCustomer) {
            throw new Error(constants.customerMessage.DUPLICATE_EMAIL);
        }
        let result = await customer.save();
        return formatMongoData(result);
    } catch (error) {
        console.log('Something went wrong: Service: createCustomer', error);
        throw new Error(error);
    }
}

module.exports.updateCustomer = async ({ id, updateInfo }) => {
    try {
        checkObjectId(id);
        const validateCustomer = await Customer.findOne({ email: updateInfo.email });
        if (validateCustomer && validateCustomer.id != id) {
            throw new Error(constants.customerMessage.DUPLICATE_EMAIL);
        }
        let customer = await Customer.findOneAndUpdate(
            { _id: id },
            updateInfo,
            { new: true }
        )
        if (!customer) {
            throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
        }
        return formatMongoData(customer);
    } catch (error) {
        console.log('Something went wrong: Service: updateCustomer', error);
        throw new Error(error);
    }
}

module.exports.getAllCustomers = async ({ skip = 0, limit = 1000, sort = '', filter = [] }) => {
    try {
        filter = typeof filter =='string' ? JSON.parse(filter) : filter;
        sort = createSortObject(sort);
        const filters = createFilterObject(filter);
        let customers = await Customer.find(filters)
                        .skip(parseInt(skip))
                        .limit(parseInt(limit))
                        .sort(sort)
        return formatMongoData(customers);
    } catch (error) {
        console.log('Something went wrong: Service: getAllCustomers', error);
        throw new Error(error);
    }
}

module.exports.getCustomerById = async ({ id }) => {
    try {
        checkObjectId(id);
        let customer = await Customer.findById(id);
        if (!customer) {
            throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
        }
        return formatMongoData(customer);
    } catch (error) {
        console.log('Something went wrong: Service: getCustomerById', error);
        throw new Error(error);
    }
}

module.exports.signup = async ({ email, password }) => {
    try {
        const customer = await Customer.findOne({ email });
        if (customer) {
            throw new Error(constants.customerMessage.DUPLICATE_EMAIL);
        }
        password = await bcrypt.hash(password, 12);
        const newcustomer = new customer({ email, password });
        let result = await newcustomer.save();
        return formatMongoData(result);
    } catch (error) {
        console.log('Something went wrong: Service: signup', error);
        throw new Error(error);
    }
}

module.exports.login = async ({ email, password }) => {
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
        }
        const isValid = await bcrypt.compare(password, customer.password);
        if (!isValid) {
            throw new Error(constants.customerMessage.INVALID_PASSWORD);
        }
        const token = jwt.sign({ id: customer._id }, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '1d' });
        return { token };
    } catch (error) {
        console.log('Something went wrong: Service: login', error);
        throw new Error(error);
    }

}