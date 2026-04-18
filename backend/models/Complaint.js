const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Complaint title is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Complaint category is required'],
        enum: ['service', 'product', 'staff', 'facility', 'billing', 'technical', 'other']
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    description: {
        type: String,
        required: [true, 'Complaint description is required']
    },
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    accountNumber: {
        type: String,
        default: ''
    },
    branchName: {
        type: String,
        required: [true, 'Branch name is required']
    },
    incidentDate: {
        type: Date,
        required: [true, 'Incident date is required']
    },
    attachments: [{
        type: String,
        default: ''
    }],
    status: {
        type: String,
        enum: ['new', 'acknowledged', 'in_progress', 'pending_action', 'resolved', 'closed'],
        default: 'new'
    },
    resolution: {
        type: String,
        default: ''
    },
    resolutionDate: {
        type: Date,
        default: null
    },
    compensationOffered: {
        type: String,
        default: ''
    },
    adminNotes: {
        type: String,
        default: ''
    },
    customerSatisfaction: {
        type: String,
        enum: ['not_rated', 'very_dissatisfied', 'dissatisfied', 'neutral', 'satisfied', 'very_satisfied'],
        default: 'not_rated'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);
