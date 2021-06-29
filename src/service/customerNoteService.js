const CustomerNote = require('../database/models/customerNoteModel');
const { formatMongoData, checkObjectId, createSortObject, createFilterObject } = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.createCustomerNote = async (serviceData) => {    
    try {
        let customerNote = new CustomerNote({ ...serviceData });
        let result = await customerNote.save();
        return formatMongoData(result);
    } catch (error) {
        console.log('Something went wrong: Service: createCustomerNote', error);
        throw new Error(error);
    }
}

module.exports.updateCustomerNote = async ({ customerId, noteId, updateInfo }) => {
    try {
        checkObjectId(customerId);
        checkObjectId(noteId);        
        let customerNote = await CustomerNote.findOneAndUpdate(
            { _id: noteId, customer: customerId },
            updateInfo,
            { new: true }
        )
        if (!customerNote) {
            throw new Error(constants.customerNoteMessage.CUSTOMER_NOTE_NOT_FOUND);
        }
        return formatMongoData(customerNote);
    } catch (error) {
        console.log('Something went wrong: Service: updateCustomerNote', error);
        throw new Error(error);
    }
}

module.exports.getAllCustomerNotes = async (customerId, { skip = 0, limit = 1000, sort = '', filter = [] }) => {
    try {        
        filter = typeof filter =='string' ? JSON.parse(filter) : filter;        
        checkObjectId(customerId);
        sort = createSortObject(sort);
        const filters = createFilterObject(filter);
        filters.customer = customerId;
        let customerNotes = await CustomerNote
                                    .find(filters)
                                    .skip(parseInt(skip))
                                    .limit(parseInt(limit))
                                    .sort(sort)
                                    .populate('customer')   
                                    .populate('user')                                        
        return formatMongoData(customerNotes);
    } catch (error) {
        console.log('Something went wrong: Service: getAllCustomerNotes', error);
        throw new Error(error);
    }
}

module.exports.getCustomerNoteById = async ({ customerId, noteId }) => {
    try {
        checkObjectId(noteId);
        let customerNote = await CustomerNote.findById(noteId)
                                                .populate('customer')   
                                                .populate('user')               
        if (!customerNote || customerNote.customer.id != customerId) {
            throw new Error(constants.customerNoteMessage.CUSTOMER_NOTE_NOT_FOUND);
        }
        return formatMongoData(customerNote);
    } catch (error) {
        console.log('Something went wrong: Service: getCustomerNoteById', error);
        throw new Error(error);
    }
}

module.exports.deleteCustomerNote = async ({ customerId, noteId }) => {
    try {
        checkObjectId(customerId);
        checkObjectId(noteId);
        let customerNote = await CustomerNote.findOneAndDelete({ _id: noteId, customer: customerId });
        if (!customerNote) {
            throw new Error(constants.customerNoteMessage.CUSTOMER_NOTE_NOT_FOUND);
        }
        return formatMongoData(customerNote);
    } catch (error) {
        console.log('Something went wrong: Service: deleteCustomerNote', error);
        throw new Error(error);
    }
}