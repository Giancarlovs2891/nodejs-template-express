const CustomerFile = require('../database/models/customerFileModel');
const { formatMongoData, checkObjectId, createSortObject, createFilterObject } = require('../helper/dbHelper');
const constants = require('../constants');
const { storeWithOriginalName, uploadToS3 } = require('../helper/fileHelper');

module.exports.createCustomerFile = async (serviceData) => {    
    try {
        const file = storeWithOriginalName(serviceData.file);
        const s3File = await uploadToS3(file);
        serviceData.url = s3File.Location;                
        let customerFile = new CustomerFile({ ...serviceData });
        let result = await customerFile.save();
        return formatMongoData(result);
    } catch (error) {
        console.log('Something went wrong: Service: createCustomerFile', error);
        throw new Error(error);
    }
}

module.exports.updateCustomerFile = async ({ customerId, fileId, updateInfo }) => {
    try {
        checkObjectId(customerId);
        checkObjectId(fileId);   
        if (updateInfo.file) {
            const file = storeWithOriginalName(updateInfo.file);
            const s3File = await uploadToS3(file);
            updateInfo.url = s3File.Location;
        }            
        let customerFile = await CustomerFile.findOneAndUpdate(
            { _id: fileId, customer: customerId },
            updateInfo,
            { new: true }
        )
        customerFile = await CustomerFile.findById(customerFile.id);        
        if (!customerFile) {
            throw new Error(constants.customerFileMessage.CUSTOMER_FILE_NOT_FOUND);
        }
        return formatMongoData(customerFile);
    } catch (error) {
        console.log('Something went wrong: Service: updateCustomerFile', error);
        throw new Error(error);
    }
}

module.exports.getAllCustomerFiles = async (customerId, { skip = 0, limit = 1000, sort = '', filter = [] }) => {
    try {        
        filter = typeof filter =='string' ? JSON.parse(filter) : filter;        
        checkObjectId(customerId);
        sort = createSortObject(sort);
        const filters = createFilterObject(filter);
        filters.customer = customerId;
        console.log(filters);
        
        let customerFiles = await CustomerFile
                                    .find(filters)
                                    .skip(parseInt(skip))
                                    .limit(parseInt(limit))
                                    .sort(sort)
                                    .populate('customer')   
                                    .populate('user')                                     
        return formatMongoData(customerFiles);
    } catch (error) {
        console.log('Something went wrong: Service: getAllCustomerFiles', error);
        throw new Error(error);
    }
}

module.exports.getCustomerFileById = async ({ customerId, fileId }) => {
    try {
        checkObjectId(fileId);
        let customerFile = await CustomerFile.findById(fileId)
                                                .populate('customer')   
                                                .populate('user')        
        if (!customerFile || customerFile.customer.id != customerId) {
            throw new Error(constants.customerFileMessage.CUSTOMER_FILE_NOT_FOUND);
        }
        return formatMongoData(customerFile);
    } catch (error) {
        console.log('Something went wrong: Service: getCustomerFileById', error);
        throw new Error(error);
    }
}

module.exports.deleteCustomerFile = async ({ customerId, fileId }) => {
    try {
        checkObjectId(customerId);
        checkObjectId(fileId);
        let customerFile = await CustomerFile.findOneAndDelete({ _id: fileId, customer: customerId });
        if (!customerFile) {
            throw new Error(constants.customerFileMessage.CUSTOMER_FILE_NOT_FOUND);
        }
        return formatMongoData(customerFile);
    } catch (error) {
        console.log('Something went wrong: Service: deleteCustomerFile', error);
        throw new Error(error);
    }
}