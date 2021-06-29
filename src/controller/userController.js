const constants = require('../constants');
const userService = require('../service/userService');

module.exports.createUser = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await userService.createUser(req.body);
        response.status = 200;
        response.message = constants.userMessage.USER_CREATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: createUser', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateUser = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await userService.updateUser({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.userMessage.USER_UPDATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: updateUser', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateUserPassword = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await userService.updateUserPassword({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.userMessage.USER_UPDATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: updateUserPassword', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getUserById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await userService.getUserById(req.params);
        response.status = 200;
        response.message = constants.userMessage.USER_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getUserById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getProfile = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const id = req.loggedUser.id
        console.log(id);
        
        const responseFromService = await userService.getUserById({ id });
        response.status = 200;
        response.message = constants.userMessage.USER_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getUserById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.signup = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await userService.signup(req.body);
        response.status = 200;
        response.message = constants.userMessage.SIGNUP_SUCCESS;
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
        const responseFromService = await userService.login(req.body);
        response.status = 200;
        response.message = constants.userMessage.LOGIN_SUCCESS;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: login', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.forgotPassword = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await userService.forgotPassword(req.body);
        response.status = 200;
        response.message = constants.userMessage.TOKEN_SENT;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: login', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.resetUserPassword = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await userService.resetUserPassword(req.body);
        response.status = 200;
        response.message = constants.userMessage.RESET_PASSWORD;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: login', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}