const mongoose = require('mongoose');

const savingsProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['savings', 'fixed_deposit', 'children', 'senior', 'special', 'other']
    },
    interestRate: {
        type: Number,
        required: [true, 'Interest rate is required']
    },
    minDeposit: {
        type: Number,
        default: 0
    },
    maxDeposit: {
        type: Number
    },
    tenure: {
        type: String,
        comment: 'Deposit term (e.g., 1 month, 3 months, 1 year)'
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    eligibility: [{
        type: String
    }],
    features: [{
        type: String
    }],
    requiredDocuments: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SavingsProduct', savingsProductSchema);
