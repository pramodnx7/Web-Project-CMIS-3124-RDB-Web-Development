const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Branch name is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    fax: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        required: [true, 'Province is required'],
        enum: ['Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa']
    },
    district: {
        type: String,
        required: [true, 'District is required']
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', branchSchema);
