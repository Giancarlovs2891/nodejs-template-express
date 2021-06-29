const customerAddressService = require('../service/customerAddressService');
const constants = require('../constants');

module.exports.createCustomerAddress = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        req.body['customer'] = req.params.customerId;
        const responseFromService = await customerAddressService.createCustomerAddress(req.body);
        response.status = 200;
        response.message = constants.customerAddressMessage.CUSTOMER_ADDRESS_CREATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: createCustomerAddress', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateCustomerAddress = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerAddressService.updateCustomerAddress({
            customerId: req.params.customerId,
            addressId: req.params.addressId,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.customerAddressMessage.CUSTOMER_ADDRESS_UPDATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: updateCustomerAddress', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getAllCustomerAddresses = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        console.log(req.query);
        
        const responseFromService = await customerAddressService.getAllCustomerAddresses(
            req.params.customerId,
            req.query
        );
        response.status = 200;
        response.message = constants.customerAddressMessage.CUSTOMER_ADDRESS_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getAllCustomerAddresss', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getCustomerAddressById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerAddressService.getCustomerAddressById(req.params);
        response.status = 200;
        response.message = constants.customerAddressMessage.CUSTOMER_ADDRESS_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getCustomerAddressById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteCustomerAddress = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerAddressService.deleteCustomerAddress(req.params);
        response.status = 200;
        response.message = constants.customerAddressMessage.CUSTOMER_ADDRESS_DELETED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: deleteCustomerAddress', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}