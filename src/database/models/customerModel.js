const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    email: String,
    password: String,
    companyName: String,
    companyType: { type: String, enum: ['Corporation', 'Partnership', 'Sole Propietorship']},
    contactName: String,
    phone: String,
    position: String,
    einvatss: String,
    eori: String,
    yearsInBusiness: Number,
    country: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    status: { type: String, enum: ['Pending Approval', 'On Credit Hold', 'Active', 'Inactive']},
    code: String,
    currency: { type: String, enum: ['USD', 'EUR', 'GBP']},
    approvedAmount: Number,
    paymentTerms: { type: String, enum: ['Due Upon Receipt', 'Net 7', 'Net 14', 'Net 30']},
    paymentMethod: { type: String, enum: ['Credit Card', 'Checks', 'Echecks', 'Direct Deposit']},
    vip: { type: Boolean, default: false }
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Customer', customerSchema);