const mongoose = require('mongoose');
const constants = require('../constants');

module.exports.formatMongoData = (data) => {   
    if (Array.isArray(data)) {
        let newDataList = [];
        for (value of data) {
            newDataList.push(value.toObject());
        }
        return newDataList;
    }
    return data.toObject();
}

module.exports.checkObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(constants.databaseMessage.INVALID_ID);
    }
}

module.exports.setObjectId = (id) => {
    return mongoose.Types.ObjectId(id)
}

module.exports.createSortObject = (sort) => {
    if (sort != '') {
        let trasnsformSort = sort.split('|');
        sort = {};
        sort[trasnsformSort[0]] = trasnsformSort[1] == 'asc' ? 1 : -1;            
    }
    return sort;
}

module.exports.createFilterObject = (filter) => {
    let filters = {};    
    filter.forEach(obj => {
        let value;
        switch (obj.op) {
            case 'is':
                if (obj.f == 'createdAt' || obj.f == 'updatedAt' || obj.f.toLowerCase().includes('date')) {
                    const date = new Date(obj.val);
                    const date2 = new Date(obj.val);
                    const tomorrow = new Date(date2.setDate(date2.getDate() + 1))
                    value = {
                        $gte: date, $lte: tomorrow
                    };
                } else {
                    value = obj.val;
                }
                break;
            case 'like':
                console.log(obj);
                
                if (obj.f == 'createdAt' || obj.f == 'updatedAt' || obj.f.toLowerCase().includes('date')) {
                    const date = new Date(obj.val);
                    const date2 = new Date(obj.val);
                    const tomorrow = new Date(date2.setDate(date2.getDate() + 1))
                    value = {
                        $gte: date, $lte: tomorrow
                    };
                } else {
                    value = new RegExp(obj.val, 'i');
                }
                break;
            default:
                if (obj.f == 'createdAt' || obj.f == 'updatedAt' || obj.f.toLowerCase().includes('date')) {
                    const date = new Date(obj.val);
                    const date2 = new Date(obj.val);
                    const tomorrow = new Date(date2.setDate(date2.getDate() + 1))
                    value = {
                        $gte: date, $lte: tomorrow
                    };
                } else {
                    value = obj.val;
                }
                break;
        }
        filters[obj.f] = value;        
    });    
    return filters;
}