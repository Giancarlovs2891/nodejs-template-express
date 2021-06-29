const mongoose = require('mongoose');

const customerAddressSchema = new mongoose.Schema({
    contactName: String,
    phone: String,
    email: String,
    nickname: String,
    country: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    defaultOrigin: Boolean,
    defaultDestination: Boolean,
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    isBillingAddress: Boolean,
    isCorporateAddress: Boolean
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            if (!ret.hasOwnProperty('isCorporateAddress')) {
                ret.isCorporateAddress = true;
            }
            return ret;
        }
    }
});

module.exports = mongoose.model('CustomerAddress', customerAddressSchema);