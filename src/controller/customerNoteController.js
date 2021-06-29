const customerNoteService = require('../service/customerNoteService');
const constants = require('../constants');

module.exports.createCustomerNote = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        req.body['customer'] = req.params.customerId;
        req.body['user'] = req.loggedUser.id;
        const responseFromService = await customerNoteService.createCustomerNote(req.body);
        response.status = 200;
        response.message = constants.customerNoteMessage.CUSTOMER_NOTE_CREATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: createCustomerNote', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateCustomerNote = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerNoteService.updateCustomerNote({
            customerId: req.params.customerId,
            noteId: req.params.noteId,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.customerNoteMessage.CUSTOMER_NOTE_UPDATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: updateCustomerNote', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getAllCustomerNotes = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        console.log(req.query);
        
        const responseFromService = await customerNoteService.getAllCustomerNotes(
            req.params.customerId,
            req.query
        );
        response.status = 200;
        response.message = constants.customerNoteMessage.CUSTOMER_NOTE_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getAllCustomerNotes', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getCustomerNoteById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerNoteService.getCustomerNoteById(req.params);
        response.status = 200;
        response.message = constants.customerNoteMessage.CUSTOMER_NOTE_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getCustomerNoteById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteCustomerNote = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await customerNoteService.deleteCustomerNote(req.params);
        response.status = 200;
        response.message = constants.customerNoteMessage.CUSTOMER_NOTE_DELETED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: deleteCustomerNote', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}