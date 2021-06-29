const User = require('../database/models/userModel');
const constants = require('../constants');
const { formatMongoData, checkObjectId, createSortObject, createFilterObject } = require('../helper/dbHelper');
const { sendMail } = require('../helper/mailHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createUser = async ({ firstName, lastName, email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            throw new Error(constants.userMessage.DUPLICATE_EMAIL);
        }
        password = await bcrypt.hash(password, 12);
        const newUser = new User({ firstName, lastName, email, password });
        let result = await newUser.save();
        return formatMongoData(result);
    } catch (error) {
        console.log('Something went wrong: Service: crateUser', error);
        throw new Error(error);
    }
}

module.exports.updateUser = async ({ id, updateInfo }) => {
    try {
        checkObjectId(id);
        const validateUser = await User.findOne({ email: updateInfo.email });
        if (validateUser && validateUser.id != id) {
            throw new Error(constants.userMessage.DUPLICATE_EMAIL);
        }
        let user = await User.findOneAndUpdate(
            { _id: id },
            updateInfo,
            { new: true }
        )
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        return formatMongoData(user);
    } catch (error) {
        console.log('Something went wrong: Service: updateUser', error);
        throw new Error(error);
    }
}

module.exports.updateUserPassword = async ({ id, updateInfo }) => {
    try {
        checkObjectId(id);
        let user = await User.findById(id);
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        const isValid = await bcrypt.compare(updateInfo.currentPassword, user.password);        
        if (!isValid) {
            throw new Error(constants.userMessage.INVALID_PASSWORD);
        }
        user.update({
            password: await bcrypt.hash(updateInfo.newPassword, 12)
        });        
        return formatMongoData(user);
    } catch (error) {
        console.log('Something went wrong: Service: updateUser', error);
        throw new Error(error);
    }
}

module.exports.getUserById = async ({ id }) => {
    try {
        checkObjectId(id);
        let user = await User.findById(id);
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        return formatMongoData(user);
    } catch (error) {
        console.log('Something went wrong: Service: getUserById', error);
        throw new Error(error);
    }
}

module.exports.signup = async ({ firstName, lastName, email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            throw new Error(constants.userMessage.DUPLICATE_EMAIL);
        }
        password = await bcrypt.hash(password, 12);
        const newUser = new User({ firstName, lastName, email, password });
        let result = await newUser.save();
        return formatMongoData(result);
    } catch (error) {
        console.log('Something went wrong: Service: signup', error);
        throw new Error(error);
    }
}

module.exports.login = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error(constants.userMessage.INVALID_PASSWORD);
        }
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email
        }, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '1d' });
        return { token };
    } catch (error) {
        console.log('Something went wrong: Service: login', error);
        throw new Error(error);
    }
}

module.exports.forgotPassword = async ({ email }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        const token = await bcrypt.hash(Math.random().toString(36), 12);
        console.log(user, token);
        
        await User.findOneAndUpdate(
            { _id: user.id },
            { forgotToken: token },
            { new: true }
        );     
        
        await sendMail({
            to: email,
            type: 'forgotPassword',
            data: {
                subject: `Reset password`,
                token
            }
        });

        return { sent: email };
    } catch (error) {
        console.log('Something went wrong: Service: login', error);
        throw new Error(error);
    }
}

module.exports.resetUserPassword = async ({ token, password }) => {
    try {
        let user = await User.findOne({
            forgotToken: token
        });
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        await User.findOneAndUpdate(
            { _id: user.id },
            { 
                password: await bcrypt.hash(password, 12),
                forgotToken: ''
            },
            { new: true }
        );      
        return formatMongoData(user);
    } catch (error) {
        console.log('Something went wrong: Service: updateUser', error);
        throw new Error(error);
    }
}