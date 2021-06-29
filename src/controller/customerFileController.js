const customerFileService = require('../service/customerFileService');
const constants = require('../constants');

module.exports.createCustomerFile = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        req.body['customer'] = req.params.customerId;
        req.body['user'] = req.loggedUser.id;
        req.body['file'] = req.file;
        const responseFromService = await customerFileService.createCustomerFile(req.body);
        response.status = 200;
        response.message = constants.customerFileMessage.CUSTOMER_FILE_CREATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: createCustomerFile', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateCustomerFile = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        req.body['file'] = req.file;
        const responseFromService = await customerFileService.updateCustomerFile({
            customerId: req.params.customerId,
            fileId: req.params.fileId,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.customerFileMessage.CUSTOMER_FILE_UPDATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: updateCustomerFile', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getAllCustomerFiles = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        console.log(req.query);
        
        const responseFromService = await customerFileService.getAllCustomerFiles(
            req.params.customerId,
            req.query
        );
        response.status = 200;
        response.message = constants.customerFileMessage.CUSTOMER_FILE_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getAllCustomerFiles', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getCustomerFileById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerFileService.getCustomerFileById(req.params);
        response.status = 200;
        response.message = constants.customerFileMessage.CUSTOMER_FILE_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getCustomerFileById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteCustomerFile = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerFileService.deleteCustomerFile(req.params);
        response.status = 200;
        response.message = constants.customerFileMessage.CUSTOMER_FILE_DELETED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: deleteCustomerFile', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}