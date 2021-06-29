const constants = require('../constants');
const customerService = require('../service/customerService');

module.exports.createCustomer = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerService.createCustomer(req.body);
        response.status = 200;
        response.message = constants.customerMessage.CUSTOMER_CREATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: create', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateCustomer = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerService.updateCustomer({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.customerMessage.CUSTOMER_UPDATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: updateCustomer', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getAllCustomers = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {        
        const responseFromService = await customerService.getAllCustomers(req.query);
        response.status = 200;
        response.message = constants.customerMessage.CUSTOMER_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getAllCustomers', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getCustomerById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerService.getCustomerById(req.params);
        response.status = 200;
        response.message = constants.customerMessage.CUSTOMER_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getCustomerById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.signup = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerService.signup(req.body);
        response.status = 200;
        response.message = constants.customerMessage.SIGNUP_SUCCESS;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: signup', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.login = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerService.login(req.body);
        response.status = 200;
        response.message = constants.customerMessage.LOGIN_SUCCESS;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: login', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}