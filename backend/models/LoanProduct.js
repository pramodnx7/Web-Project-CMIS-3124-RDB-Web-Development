const mongoose = require('mongoose');

const loanProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['personal', 'agriculture', 'business', 'housing', 'vehicle', 'education', 'refinance', 'pawning', 'leasing', 'other']
    },
    interestRate: {
        type: Number,
        required: [true, 'Interest rate is required']
    },
    maxAmount: {
        type: Number
    },
    maxTerm: {
        type: Number,
        comment: 'Maximum term in months'
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

module.exports = mongoose.model('LoanProduct', loanProductSchema);
