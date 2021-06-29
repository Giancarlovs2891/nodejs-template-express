module.exports = {
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    userMessage: {
        SIGNUP_SUCCESS: 'Signup Success',
        LOGIN_SUCCESS: 'Login Success',
        TOKEN_SENT: 'Token has been sent',
        RESET_PASSWORD: 'Password has been reset',
        DUPLICATE_EMAIL: 'User already exist with given email',
        USER_NOT_FOUND: 'User not found',
        INVALID_PASSWORD: 'Incorrect Password',
        USER_CREATED: 'User Created Successfully',
        USER_FETCHED: 'User Fetched Successfully',
        USER_UPDATED: 'User Updated Successfully',
        USER_DELETED: 'User Deleted Successfully',
        USER_NOT_FOUND: 'User Not Found'
    },
    customerMessage: {
        SIGNUP_SUCCESS: 'Signup Success',
        LOGIN_SUCCESS: 'Login Success',
        DUPLICATE_EMAIL: 'Customer already exist with given email',
        USER_NOT_FOUND: 'Customer not found',
        INVALID_PASSWORD: 'Incorrect Password',
        CUSTOMER_CREATED: 'Customer Created Successfully',
        CUSTOMER_FETCHED: 'Customer Fetched Successfully',
        CUSTOMER_UPDATED: 'Customer Updated Successfully',
        CUSTOMER_DELETED: 'Customer Deleted Successfully',
        CUSTOMER_NOT_FOUND: 'Customer Not Found'
    },
    customerAddressMessage: {
        CUSTOMER_ADDRESS_CREATED: 'Customer Address Created Successfully',
        CUSTOMER_ADDRESS_FETCHED: 'Customer Address Fetched Successfully',
        CUSTOMER_ADDRESS_UPDATED: 'Customer Address Updated Successfully',
        CUSTOMER_ADDRESS_DELETED: 'Customer Address Deleted Successfully',
        CUSTOMER_ADDRESS_NOT_FOUND: 'Customer Address Not Found'
    },
    customerNoteMessage: {
        CUSTOMER_NOTE_CREATED: 'Customer Note Created Successfully',
        CUSTOMER_NOTE_FETCHED: 'Customer Note Fetched Successfully',
        CUSTOMER_NOTE_UPDATED: 'Customer Note Updated Successfully',
        CUSTOMER_NOTE_DELETED: 'Customer Note Deleted Successfully',
        CUSTOMER_NOTE_NOT_FOUND: 'Customer Note Not Found'
    },
    customerFileMessage: {
        CUSTOMER_FILE_CREATED: 'Customer File Created Successfully',
        CUSTOMER_FILE_FETCHED: 'Customer File Fetched Successfully',
        CUSTOMER_FILE_UPDATED: 'Customer File Updated Successfully',
        CUSTOMER_FILE_DELETED: 'Customer File Deleted Successfully',
        CUSTOMER_FILE_NOT_FOUND: 'Customer File Not Found'
    },
    requestValidationMessage: {
        BAD_REQUEST: 'Invalid fields',
        TOKEN_MISSING: 'Token missing from header'
    },
    databaseMessage: {
        INVALID_ID: 'Invalid Id'
    }
}