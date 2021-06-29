const CustomerAddress = require('../database/models/customerAddressModel');
const { formatMongoData, checkObjectId, createSortObject, createFilterObject } = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.createCustomerAddress = async (serviceData) => {    
    try {
        let customerAddress = new CustomerAddress({ ...serviceData });
        let result = await customerAddress.save();
        return formatMongoData(result);
    } catch (error) {
        console.log('Something went wrong: Service: createCustomerAddress', error);
        throw new Error(error);
    }
}

module.exports.updateCustomerAddress = async ({ customerId, addressId, updateInfo }) => {
    try {
        checkObjectId(customerId);
        checkObjectId(addressId);        
        let customerAddress = await CustomerAddress.findOneAndUpdate(
            { _id: addressId, customer: customerId },
            updateInfo,
            { new: true }
        )
        if (!customerAddress) {
            throw new Error(constants.customerAddressMessage.CUSTOMER_ADDRESS_NOT_FOUND);
        }
        return formatMongoData(customerAddress);
    } catch (error) {
        console.log('Something went wrong: Service: updateCustomerAddress', error);
        throw new Error(error);
    }
}

module.exports.getAllCustomerAddresses = async (customerId, { skip = 0, limit = 1000, sort = '', filter = [] }) => {
    try {        
        filter = typeof filter =='string' ? JSON.parse(filter) : filter;        
        checkObjectId(customerId);
        sort = createSortObject(sort);
        const filters = createFilterObject(filter);
        filters.customer = customerId;
        let customerAddresses = await CustomerAddress
                                    .find(filters)
                                    .skip(parseInt(skip))
                                    .limit(parseInt(limit))
                                    .sort(sort)
                                    .populate('customer')                                 
        return formatMongoData(customerAddresses);
    } catch (error) {
        console.log('Something went wrong: Service: getAllCustomerAddresss', error);
        throw new Error(error);
    }
}

module.exports.getCustomerAddressById = async ({ customerId, addressId }) => {
    try {
        checkObjectId(addressId);
        let customerAddress = await CustomerAddress.findById(addressId);       
        if (!customerAddress || customerAddress.customer != customerId) {
            throw new Error(constants.customerAddressMessage.CUSTOMER_ADDRESS_NOT_FOUND);
        }
        return formatMongoData(customerAddress);
    } catch (error) {
        console.log('Something went wrong: Service: getCustomerAddressById', error);
        throw new Error(error);
    }
}

module.exports.deleteCustomerAddress = async ({ id }) => {
    try {
        checkObjectId(id);
        let customerAddress = await CustomerAddress.findByIdAndDelete(id);
        if (!customerAddress) {
            throw new Error(constants.customerAddressMessage.CUSTOMER_ADDRESS_NOT_FOUND);
        }
        return formatMongoData(customerAddress);
    } catch (error) {
        console.log('Something went wrong: Service: deleteCustomerAddress', error);
        throw new Error(error);
    }
}